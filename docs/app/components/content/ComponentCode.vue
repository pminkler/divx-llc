<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import type { ChipProps } from '@nuxt/ui'
import json5 from 'json5'
import { upperFirst, camelCase, kebabCase } from 'scule'
import { hash } from 'ohash'
import { CalendarDate } from '@internationalized/date'
import * as theme from '#build/ui'
import * as themePro from '#build/ui-pro'
import { get, set } from '#ui/utils'

interface Cast {
  get: (args: any) => any
  template: (args: any) => string
}

type CastDateValue = [number, number, number]

const castMap: Record<string, Cast> = {
  'DateValue': {
    get: (args: CastDateValue) => new CalendarDate(...args),
    template: (value: CalendarDate) => {
      return value ? `new CalendarDate(${value.year}, ${value.month}, ${value.day})` : 'null'
    }
  },
  'DateValue[]': {
    get: (args: CastDateValue[]) => args.map(date => new CalendarDate(...date)),
    template: (value: CalendarDate[]) => {
      return value ? `[${value.map(date => `new CalendarDate(${date.year}, ${date.month}, ${date.day})`).join(', ')}]` : '[]'
    }
  },
  'DateRange': {
    get: (args: { start: CastDateValue, end: CastDateValue }) => ({ start: new CalendarDate(...args.start), end: new CalendarDate(...args.end) }),
    template: (value: { start: CalendarDate, end: CalendarDate }) => {
      if (!value.start || !value.end) {
        return `{ start: null, end: null }`
      }

      return `{ start: new CalendarDate(${value.start.year}, ${value.start.month}, ${value.start.day}), end: new CalendarDate(${value.end.year}, ${value.end.month}, ${value.end.day}) }`
    }
  }
}

const props = defineProps<{
  pro?: boolean
  prose?: boolean
  prefix?: string
  /** Override the slug taken from the route */
  slug?: string
  class?: any
  /** List of props to ignore in selection */
  ignore?: string[]
  /** List of props to hide from code and selection */
  hide?: string[]
  /** List of props to externalize in script setup */
  external?: string[]
  /** The types of the externalized props */
  externalTypes?: string[]
  /** List of props to use with `v-model` */
  model?: string[]
  /** List of props to cast from code and selection */
  cast?: { [key: string]: string }
  /** List of items for each prop */
  items?: { [key: string]: string[] }
  props?: { [key: string]: any }
  slots?: { [key: string]: any }
  /**
   * Whether to format the code with Prettier
   * @defaultValue false
   */
  prettier?: boolean
  /**
   * Whether to collapse the code block
   * @defaultValue false
   */
  collapse?: boolean
  /**
   * A list of line numbers to highlight in the code block
   */
  highlights?: number[]
  /**
   * Whether to add overflow-hidden to wrapper
   */
  overflowHidden?: boolean
}>()

const route = useRoute()
const { $prettier } = useNuxtApp()

const camelName = camelCase(props.slug ?? route.path.split('/').pop() ?? '')
const name = `${props.prose ? 'Prose' : 'U'}${upperFirst(camelName)}`
const component = defineAsyncComponent(() => {
  if (props.pro) {
    if (props.prefix) {
      return import(`#ui-pro/components/${props.prefix}/${upperFirst(camelName)}.vue`)
    }

    if (props.prose) {
      return import(`#ui-pro/components/prose/${upperFirst(camelName)}.vue`)
    }

    return import(`#ui-pro/components/${upperFirst(camelName)}.vue`)
  }

  return import(`#ui/components/${upperFirst(camelName)}.vue`)
})

const componentProps = reactive({
  ...Object.fromEntries(Object.entries(props.props || {}).map(([key, value]) => {
    const cast = props.cast?.[key]

    if (cast && !castMap[cast]) {
      throw new Error(`Unknown cast: ${cast}`)
    }

    return [key, cast ? castMap[cast]!.get(value) : value]
  }))
})
const componentEvents = reactive({
  ...Object.fromEntries((props.model || []).map(key => [`onUpdate:${key}`, (e: any) => setComponentProp(key, e)])),
  ...(componentProps.modelValue ? { [`onUpdate:modelValue`]: (e: any) => setComponentProp('modelValue', e) } : {})
})

function getComponentProp(name: string) {
  return get(componentProps, name) ?? undefined
}

function setComponentProp(name: string, value: any) {
  set(componentProps, name, value)
}

const componentTheme = ((props.pro ? props.prose ? themePro.prose : themePro : theme) as any)[camelName]
const meta = await fetchComponentMeta(name as any)

function mapKeys(obj: object, parentKey = ''): any {
  return Object.entries(obj || {}).flatMap(([key, value]: [string, any]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return mapKeys(value, key)
    }

    const fullKey = parentKey ? `${parentKey}.${key}` : key

    return !props.ignore?.includes(fullKey) && !props.hide?.includes(fullKey) ? fullKey : undefined
  }).filter(Boolean)
}

const options = computed(() => {
  const keys = mapKeys(props.props || {})

  return keys.map((key: string) => {
    const prop = meta?.meta?.props?.find((prop: any) => prop.name === key)
    const propItems = get(props.items, key, [])
    const items = propItems.length
      ? propItems.map((item: any) => ({
          value: item,
          label: String(item)
        }))
      : prop?.type === 'boolean' || prop?.type === 'boolean | undefined'
        ? [{ value: true, label: 'true' }, { value: false, label: 'false' }]
        : Object.keys(componentTheme?.variants?.[key] || {}).filter((variant) => {
            return variant !== 'true' && variant !== 'false'
          }).map(variant => ({
            value: variant,
            label: variant,
            chip: key.toLowerCase().endsWith('color') ? { color: variant } : undefined
          }))

    return {
      name: key,
      label: key,
      type: props?.cast?.[key] ?? prop?.type,
      items
    }
  })
})

const code = computed(() => {
  let code = ''

  if (props.prose) {
    code += `\`\`\`mdc
::${camelName}`

    const proseProps = Object.entries(componentProps).map(([key, value]) => {
      if (value === undefined || value === null || value === '' || props.hide?.includes(key)) {
        return
      }

      return `${key}="${value}"`
    }).filter(Boolean).join(' ')

    if (proseProps.length) {
      code += `{${proseProps}}`
    }

    code += `
${props.slots?.default}
::
\`\`\``

    return code
  }

  if (props.collapse) {
    code += `::code-collapse
`
  }

  code += `\`\`\`vue${props.highlights?.length ? ` {${props.highlights.join('-')}}` : ''}`

  if (props.external?.length) {
    code += `
<script setup lang="ts">
`
    if (props.externalTypes?.length) {
      const removeArrayBrackets = (type: string): string => type.endsWith('[]') ? removeArrayBrackets(type.slice(0, -2)) : type

      const types = props.externalTypes.map(type => removeArrayBrackets(type))
      code += `import type { ${types.join(', ')} } from '@nuxt/ui${props.pro ? '-pro' : ''}'

`
    }

    for (const [i, key] of props.external.entries()) {
      const cast = props.cast?.[key]
      const value = cast ? castMap[cast]!.template(componentProps[key]) : json5.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1')
      const type = props.externalTypes?.[i] ? `<${props.externalTypes[i]}>` : ''

      code += `const ${key === 'modelValue' ? 'value' : key} = ref${type}(${value})
`
    }
    code += `<\/script>
`
  }

  code += `
<template>
  <${name}`
  for (const [key, value] of Object.entries(componentProps)) {
    if (key === 'modelValue') {
      code += ` v-model="value"`
      continue
    }

    if (props.model?.includes(key)) {
      code += ` v-model:${key}="${key}"`
      continue
    }

    if (value === undefined || value === null || value === '' || props.hide?.includes(key)) {
      continue
    }

    const prop = meta?.meta?.props?.find((prop: any) => prop.name === key)
    const propDefault = prop && (prop.default ?? prop.tags?.find(tag => tag.name === 'defaultValue')?.text ?? componentTheme?.defaultVariants?.[prop.name])
    const name = kebabCase(key)

    if (typeof value === 'boolean') {
      if (value && (propDefault === 'true' || propDefault === '`true`' || propDefault === true)) {
        continue
      }
      if (!value && (!propDefault || propDefault === 'false' || propDefault === '`false`' || propDefault === false)) {
        continue
      }

      code += value ? ` ${name}` : ` :${name}="false"`
    } else if (typeof value === 'object') {
      const parsedValue = !props.external?.includes(key) ? json5.stringify(value, null, 2).replace(/,([ |\t\n]+[}|\])])/g, '$1') : key

      code += ` :${name}="${parsedValue}"`
    } else {
      if (propDefault === value) {
        continue
      }

      code += ` ${typeof value === 'number' ? ':' : ''}${name}="${value}"`
    }
  }

  if (props.slots) {
    code += `>`
    for (const [key, value] of Object.entries(props.slots)) {
      if (key === 'default') {
        code += props.slots.default
      } else {
        code += `
  <template #${key}>
    ${value}
  </template>\n`
      }
    }
    code += (Object.keys(props.slots).length > 1 ? '\n' : '') + `</${name}>`
  } else {
    code += ' />'
  }
  code += `\n</template>
\`\`\`
`

  if (props.collapse) {
    code += `
::`
  }

  return code
})

const { data: ast } = await useAsyncData(`component-code-${name}-${hash({ props: componentProps, slots: props.slots })}`, async () => {
  if (!props.prettier) {
    return parseMarkdown(code.value)
  }

  let formatted = ''
  try {
    formatted = await $prettier.format(code.value, {
      trailingComma: 'none',
      semi: false,
      singleQuote: true,
      printWidth: 100
    })
  } catch {
    formatted = code.value
  }

  return parseMarkdown(formatted)
}, { watch: [code] })
</script>

<template>
  <div class="my-5">
    <div>
      <div v-if="options.length" class="flex flex-wrap items-center gap-2.5 border border-(--ui-border-muted) border-b-0 relative rounded-t-[calc(var(--ui-radius)*1.5)] px-4 py-2.5 overflow-x-auto">
        <template v-for="option in options" :key="option.name">
          <UFormField
            :label="option.label"
            size="sm"
            class="inline-flex ring ring-(--ui-border-accented) rounded-(--ui-radius)"
            :ui="{
              wrapper: 'bg-(--ui-bg-elevated)/50 rounded-l-(--ui-radius) flex border-r border-(--ui-border-accented)',
              label: 'text-(--ui-text-muted) px-2 py-1.5',
              container: 'mt-0'
            }"
          >
            <USelect
              v-if="option.items?.length"
              :model-value="getComponentProp(option.name)"
              :items="option.items"
              value-key="value"
              color="neutral"
              variant="soft"
              class="rounded-(--ui-radius) rounded-l-none min-w-12"
              :class="[option.name.toLowerCase().endsWith('color') && 'pl-6']"
              :ui="{ itemLeadingChip: 'size-2' }"
              @update:model-value="setComponentProp(option.name, $event)"
            >
              <template v-if="option.name.toLowerCase().endsWith('color')" #leading="{ modelValue, ui }">
                <UChip
                  v-if="modelValue"
                  inset
                  standalone
                  :color="(modelValue as any)"
                  :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
                  class="size-2"
                />
              </template>
            </USelect>
            <UInput
              v-else
              :type="option.type?.includes('number') && typeof getComponentProp(option.name) === 'number' ? 'number' : 'text'"
              :model-value="getComponentProp(option.name)"
              color="neutral"
              variant="soft"
              :ui="{ base: 'rounded-(--ui-radius) rounded-l-none min-w-12' }"
              @update:model-value="setComponentProp(option.name, $event)"
            />
          </UFormField>
        </template>
      </div>

      <div v-if="component" class="flex justify-center border border-b-0 border-(--ui-border-muted) relative p-4 z-[1]" :class="[!options.length && 'rounded-t-[calc(var(--ui-radius)*1.5)]', props.class, { 'overflow-hidden': props.overflowHidden }]">
        <component :is="component" v-bind="{ ...componentProps, ...componentEvents }">
          <template v-for="slot in Object.keys(slots || {})" :key="slot" #[slot]>
            <slot :name="slot" mdc-unwrap="p">
              {{ slots?.[slot] }}
            </slot>
          </template>
        </component>
      </div>
    </div>

    <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" class="[&_pre]:!rounded-t-none [&_div.my-5]:!mt-0" />
  </div>
</template>
