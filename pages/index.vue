<template>
  <div>
    <!-- Hero Section -->
    <UPageHero orientation="horizontal" :ui="{ container: 'py-16 md:py-24' }">
      <template #title>
        <span class="text-primary">DivX, LLC</span>
        <div class="mt-4 text-3xl font-normal">Building exceptional web experiences</div>
      </template>
      
      <template #description>
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-rocket-launch" class="text-primary h-6 w-6 flex-shrink-0 mt-1" />
          <p>We transform your business ideas into powerful digital solutions. Our team of expert developers creates custom web applications tailored to your specific needs, helping you stay ahead in today's competitive digital landscape.</p>
        </div>
      </template>
    </UPageHero>

    <USeparator />

    <!-- Services Section -->
    <UPageSection title="Our Services" :ui="{ container: 'py-16' }">
      <p class="text-lg text-center mb-10 max-w-4xl mx-auto">
        From concept to deployment, we offer comprehensive web development services tailored to your business objectives. Our solutions combine technical excellence with strategic thinking to drive measurable results.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">Web Development</h3>
              <UIcon name="i-heroicons-code-bracket" class="h-6 w-6 text-primary" />
            </div>
          </template>
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Custom website and web application development using cutting-edge technologies. We build responsive, user-friendly digital solutions that work seamlessly across all devices.
          </p>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Responsive design for all devices</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Performance optimization</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Industry-leading frameworks</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">E-Commerce Solutions</h3>
              <UIcon name="i-heroicons-shopping-cart" class="h-6 w-6 text-primary" />
            </div>
          </template>
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Full-service e-commerce development from storefront design to payment integration. Maximize your online sales potential with our optimized e-commerce platforms.
          </p>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Secure payment gateways</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Inventory management</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Conversion-optimized checkout</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">Web Applications</h3>
              <UIcon name="i-heroicons-device-tablet" class="h-6 w-6 text-primary" />
            </div>
          </template>
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Powerful, scalable web applications that solve business challenges. From internal tools to consumer-facing apps, we build solutions that deliver value and results.
          </p>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Custom CRM systems</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Process automation tools</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
              <p class="text-sm">Data visualization dashboards</p>
            </div>
          </div>
        </UCard>
      </div>
      
      <div class="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div class="text-center mb-6">
          <UIcon name="i-heroicons-light-bulb" class="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 class="text-xl font-semibold mb-2">Our Development Process</h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            We follow a proven development methodology that ensures quality, transparency, and results at every stage.
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm">
            <UIcon name="i-heroicons-magnifying-glass" class="h-8 w-8 text-primary mb-3" />
            <h4 class="font-medium text-lg mb-2">1. Discovery</h4>
            <p class="text-gray-500 dark:text-gray-400">Understanding your business goals and requirements</p>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm">
            <UIcon name="i-heroicons-pencil-square" class="h-8 w-8 text-primary mb-3" />
            <h4 class="font-medium text-lg mb-2">2. Planning</h4>
            <p class="text-gray-500 dark:text-gray-400">Creating detailed specifications and architecture</p>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm">
            <UIcon name="i-heroicons-wrench-screwdriver" class="h-8 w-8 text-primary mb-3" />
            <h4 class="font-medium text-lg mb-2">3. Development</h4>
            <p class="text-gray-500 dark:text-gray-400">Building your solution with regular updates</p>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm">
            <UIcon name="i-heroicons-rocket-launch" class="h-8 w-8 text-primary mb-3" />
            <h4 class="font-medium text-lg mb-2">4. Deployment</h4>
            <p class="text-gray-500 dark:text-gray-400">Testing, launching, and providing ongoing support</p>
          </div>
        </div>
      </div>
    </UPageSection>

    <USeparator />

    <!-- About Us Section -->
    <UPageSection orientation="horizontal" :ui="{ container: 'py-16' }">
      <template #title>
        <div class="flex items-center justify-center gap-3 mb-2">
          <UIcon name="i-heroicons-star" class="h-8 w-8 text-primary" />
          <h2 class="text-2xl font-bold">Why Choose DivX</h2>
          <UIcon name="i-heroicons-star" class="h-8 w-8 text-primary" />
        </div>
      </template>
      <template #description>
        <p class="text-center max-w-4xl mx-auto mb-4">
          At DivX, LLC, we combine technical expertise with business insight to deliver web development solutions that exceed expectations. Our experienced team works closely with you to understand your business goals and create digital experiences that drive growth.
        </p>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div class="flex gap-4 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
          <UIcon name="i-heroicons-user-group" class="h-10 w-10 text-primary flex-shrink-0" />
          <div>
            <h3 class="text-lg font-medium mb-2">Expert Team</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-3">Our developers have years of experience across various industries and technologies. We bring that expertise to every project we undertake.</p>
            <div class="flex items-center gap-1 text-sm text-primary">
              <UIcon name="i-heroicons-academic-cap" class="h-4 w-4" />
              <span>Certified professionals</span>
            </div>
          </div>
        </div>
        
        <div class="flex gap-4 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
          <UIcon name="i-heroicons-light-bulb" class="h-10 w-10 text-primary flex-shrink-0" />
          <div>
            <h3 class="text-lg font-medium mb-2">Innovative Solutions</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-3">We stay at the forefront of technology trends to provide cutting-edge solutions that give your business a competitive advantage.</p>
            <div class="flex items-center gap-1 text-sm text-primary">
              <UIcon name="i-heroicons-beaker" class="h-4 w-4" />
              <span>Modern tech stack</span>
            </div>
          </div>
        </div>
        
        <div class="flex gap-4 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
          <UIcon name="i-heroicons-clock" class="h-10 w-10 text-primary flex-shrink-0" />
          <div>
            <h3 class="text-lg font-medium mb-2">Timely Delivery</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-3">We understand the importance of timelines and ensure projects are completed efficiently without compromising on quality.</p>
            <div class="flex items-center gap-1 text-sm text-primary">
              <UIcon name="i-heroicons-calendar" class="h-4 w-4" />
              <span>98% on-time delivery rate</span>
            </div>
          </div>
        </div>
        
        <div class="flex gap-4 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="h-10 w-10 text-primary flex-shrink-0" />
          <div>
            <h3 class="text-lg font-medium mb-2">Clear Communication</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-3">We maintain transparent communication throughout the development process, keeping you informed and involved at every stage.</p>
            <div class="flex items-center gap-1 text-sm text-primary">
              <UIcon name="i-heroicons-presentation-chart-line" class="h-4 w-4" />
              <span>Regular progress updates</span>
            </div>
          </div>
        </div>
      </div>
      
    </UPageSection>

    <USeparator />

    <!-- Testimonials Section -->
    <UPageSection :ui="{ container: 'py-16' }">
      <template #title>
        <div class="text-center">
          <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 class="text-2xl font-bold">What Our Clients Say</h2>
          <p class="text-gray-500 dark:text-gray-400 text-base font-normal mt-2 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what some of our clients have to say about working with DivX.
          </p>
        </div>
      </template>
      
      <div class="mt-10 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl -z-10" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard class="text-center bg-white dark:bg-gray-800">
            <div class="flex justify-center mb-4">
              <div class="flex text-yellow-400">
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
              </div>
            </div>
            <UIcon name="i-heroicons-chat-bubble-bottom" class="h-12 w-12 text-primary mx-auto mb-4" />
            <p class="text-lg italic mb-6">"DivX transformed our business with their exceptional web development services. Their attention to detail and technical expertise exceeded our expectations. The e-commerce solution they built has increased our online sales by 40%."</p>
            <div class="text-center">
              <h4 class="font-medium">Sarah Johnson</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">CEO, Marketing Solutions Inc.</p>
            </div>
          </UCard>
          
          <UCard class="text-center bg-white dark:bg-gray-800 md:mt-6">
            <div class="flex justify-center mb-4">
              <div class="flex text-yellow-400">
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
              </div>
            </div>
            <UIcon name="i-heroicons-chat-bubble-bottom" class="h-12 w-12 text-primary mx-auto mb-4" />
            <p class="text-lg italic mb-6">"Working with DivX was an outstanding experience from start to finish. They took our vision and turned it into a powerful digital platform that our users love. Their approach to project management made the entire process seamless and stress-free."</p>
            <div class="text-center">
              <h4 class="font-medium">Michael Rodriguez</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">Founder, TechStart</p>
            </div>
          </UCard>
          
          <UCard class="text-center bg-white dark:bg-gray-800">
            <div class="flex justify-center mb-4">
              <div class="flex text-yellow-400">
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
                <UIcon name="i-heroicons-star" class="h-5 w-5" />
              </div>
            </div>
            <UIcon name="i-heroicons-chat-bubble-bottom" class="h-12 w-12 text-primary mx-auto mb-4" />
            <p class="text-lg italic mb-6">"The team at DivX provided expert guidance throughout the development process. Their solution has significantly improved our operational efficiency and reduced manual work by 65%. I was particularly impressed by their responsiveness and willingness to adapt to our changing requirements."</p>
            <div class="text-center">
              <h4 class="font-medium">Emily Chen</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">Operations Director, Global Retail Co.</p>
            </div>
          </UCard>
        </div>
      </div>
      
    </UPageSection>

    <USeparator />

    <!-- Footer -->
    <UContainer class="py-8">
      <div class="border-t border-gray-200 dark:border-gray-800 pt-8">
        <div class="text-center">
          <h3 class="text-xl font-bold text-primary">DivX, LLC</h3>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Building exceptional web experiences</p>
          <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
            © {{ new Date().getFullYear() }} DivX, LLC. All rights reserved.
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'DivX, LLC - Professional Web Development Services'
})
</script>