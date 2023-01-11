<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'bg-black/20 backdrop-blur shadow border-b !px-6 border-neutral-800',
      },
      content: {
        base: 'relative z-10 flex gap-8 h-full px-6 pt-6 overflow-auto',
      },
      wrapper: {
        extend: '!overflow-hidden',
      },
      footer: {
        base: 'hidden',
      },
    }"
  >
    <template #header>
      <h1 class="text-2xl">Task Manager Demo</h1>
      <NuxtLink to="/"><Icon name="mdi:home"></Icon></NuxtLink>
    </template>
    <template #content>
      <div class="grid gap-4 grid-rows-[auto,minmax(0,1fr)] h-full shrink-0" v-for="(val, key, i) in state.columns">
        <h3 class="text-xl">{{ key }}</h3>
        <SenpDraggableList
          group="cards"
          item-key="id"
          v-model="state.columns[key]"
          class="flex flex-col gap-2 overflow-auto h-full pb-64"
          :classes="{ elementWrapper: { base: 'w-full' } }"
        >
          <template #item="{ element, index }">
            <li
              class="grid px-4 py-2 rounded bg-neutral-800 cursor-move w-80 h-max gap-3 overflow-hidden"
              :class="{ 'opacity-50': key === 'Archived' }"
              :key="element.id"
            >
              <button
                class="capitalize text-left hover:underline"
                @click="
                  () => {
                    state.activeCard = element
                    state.open = true
                  }
                "
              >
                {{ element.title }}
                <Icon name="mdi:arrow-expand"></Icon>
              </button>

              <div v-if="key !== 'Archived'" class="grid gap-y-2 gap-x-4 grid-cols-5 pb-1">
                <div class="flex items-center gap-2 col-span-3">
                  <Icon class="text-yellow-400" name="mdi:table-key" />
                  <div class="text-xs capitalize text-neutral-200">{{ element.type }}</div>
                </div>
                <div class="flex items-center gap-2 col-span-2 justify-end">
                  <Icon class="text-green-400" name="mdi:information-outline" />
                  <div class="text-xs capitalize text-neutral-200">{{ key }}</div>
                </div>
                <div class="flex col-span-5 justify-between">
                  <div class="flex items-center gap-2">
                    <Icon class="text-purple-400" name="mdi:account-outline" />
                    <div class="text-xs text-neutral-200">{{ element.assigned }}</div>
                  </div>
                  <div class="text-xs text-neutral-400 shrink-0 font-medium">
                    {{ new Date(element.created).toLocaleString(undefined, { dateStyle: 'short' }) }}
                  </div>
                </div>
              </div>
              <div v-if="key === 'Defined'">
                <div class="line-clamp-2 text-neutral-400 text-xs">{{ element.description }}</div>
              </div>
            </li>
          </template>
        </SenpDraggableList>
      </div>
      <SenpDrawer
        :classes="{
          maxSize: { base: 'w-full max-h-full max-w-[90vw] md:max-w-3xl h-full' },
        }"
        v-model:open="state.open"
        @update:open="closeModal"
        :title="state.activeCard?.title"
      >
        <div class="flex flex-col gap-4" v-if="state.activeCard">
          <div class="grid gap-4">
            <div class="flex items-center gap-2">
              <Icon class="text-yellow-400" name="mdi:table-key" />
              <div class="capitalize text-neutral-200">{{ state.activeCard.type }}</div>
            </div>
            <div class="flex items-center gap-2">
              <Icon class="text-green-400" name="mdi:information-outline" />
              <div class="capitalize text-neutral-200">{{ state.activeCard.status }}</div>
            </div>
            <div class="flex items-center gap-2">
              <Icon class="text-purple-400" name="mdi:account-outline" />
              <div class="text-neutral-200">{{ state.activeCard.assigned }}</div>
            </div>
            <div class="flex items-center gap-2">
              <Icon class="text-purple-400" name="mdi:clock" />
              <div class="text-neutral-200">
                {{ new Date(state.activeCard.created).toLocaleString(undefined, { dateStyle: 'short' }) }}
              </div>
            </div>
          </div>
          <div class="py-4">
            <div class="text-lg text-neutral-400">{{ state.activeCard.description }}</div>
          </div>
        </div>
      </SenpDrawer>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
const db = [
  {
    id: 'bfd1af91-45e9-4e39-97ab-f1cadc739ea4',
    type: 'Tech Debt',
    status: 'Archived',
    title: 'Automated client-driven matrix',
    created: '2023-01-11T00:08:14.866Z',
    assigned: 'Pam Rippin I',
    description:
      'Eum veniam eligendi. Quis iusto sint est voluptatem adipisci eum quod. Enim accusamus hic minus molestiae labore facere. In omnis placeat.',
  },
  {
    id: '4abcd34b-19e5-4d6f-858f-332553ba1f00',
    type: 'Enabler',
    status: 'Archived',
    title: 'Open-source directional process improvement',
    created: '2023-01-11T04:21:04.911Z',
    assigned: 'Bennie Waters',
    description:
      'Magni iure nulla saepe temporibus saepe debitis tempora sit. Vel distinctio modi id. Quaerat eveniet enim eaque laborum. Fugit nobis illo eum et modi. Magni rerum pariatur id ab sapiente quia laboriosam porro. Quas ab natus optio accusamus.',
  },
  {
    id: 'aab5dfed-e9d0-489b-ab01-0d86de068975',
    type: 'Business Value',
    status: 'Defined',
    title: 'Cloned contextually-based internet solution',
    created: '2023-01-11T10:30:13.564Z',
    assigned: 'Eugene Muller',
    description:
      'Perspiciatis omnis deserunt veniam voluptates error aut eligendi hic temporibus. Officia officiis ipsa dolores. Debitis esse rem quia vero ut. Dolore nisi sint ipsum aut praesentium accusantium maiores.',
  },
  {
    id: '61fd479c-e0a9-43db-a7ac-6e0aed7c9d03',
    type: 'Enabler',
    status: 'Archived',
    title: 'Ergonomic systemic time-frame',
    created: '2023-01-10T23:49:01.329Z',
    assigned: 'Bernadette Kreiger',
    description:
      'Autem facere incidunt quam rem excepturi necessitatibus. Animi enim ullam quae magnam maxime animi aperiam velit accusamus. Ex laboriosam tenetur. Laborum autem ex aliquid eveniet quas. Beatae aperiam vel repellendus nihil cumque totam eaque labore.',
  },
  {
    id: '3a85add0-1c8d-415d-b66c-63fa5163125f',
    type: 'Feature',
    status: 'Defined',
    title: 'Enterprise-wide optimal strategy',
    created: '2023-01-11T05:32:54.353Z',
    assigned: 'Pam Rippin I',
    description:
      'Consequatur deleniti velit autem consectetur veniam. Blanditiis temporibus reiciendis illum dignissimos perferendis. Autem dignissimos ipsa saepe dolores consequuntur debitis occaecati. Expedita ipsam a temporibus ipsum quo temporibus illo eum cupiditate.',
  },
  {
    id: '72b2b99a-4961-427e-9100-b679c2211132',
    type: 'Tech Debt',
    status: 'Done',
    title: 'User-friendly systemic algorithm',
    created: '2023-01-10T19:37:47.462Z',
    assigned: 'Eula Parker',
    description:
      'Aut illum porro quisquam eos eveniet eveniet molestiae dicta facilis. Iure dolorem doloribus dolorem asperiores fugit animi animi laborum.',
  },
  {
    id: 'debb7dcb-e41b-4ba5-9844-91e67045e524',
    type: 'Feature',
    status: 'Defined',
    title: 'Customer-focused maximized function',
    created: '2023-01-10T17:18:23.628Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Consequatur et voluptate magni. Nihil optio nulla error aut. Quis nesciunt fuga praesentium alias eligendi dignissimos deserunt harum exercitationem. Odit id autem.',
  },
  {
    id: '25f3322e-6998-4611-846d-72fc3a5c64f9',
    type: 'Feature',
    status: 'Verified',
    title: 'Object-based stable monitoring',
    created: '2023-01-11T13:29:58.436Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Exercitationem fugiat iusto atque doloribus. Similique iusto fuga unde consectetur. Provident explicabo quo voluptatibus vel cumque. Sed voluptate tenetur incidunt voluptatum qui.',
  },
  {
    id: 'b337671f-d7de-4e97-9f57-a588b74cdecd',
    type: 'Business Value',
    status: 'Verified',
    title: 'Enhanced contextually-based encoding',
    created: '2023-01-10T18:18:04.239Z',
    assigned: 'Pam Rippin I',
    description:
      'Asperiores impedit illo cupiditate tenetur consectetur recusandae placeat nobis assumenda. Fugit pariatur quidem. Unde quisquam eum. Dolore architecto odio earum nihil. Nostrum aspernatur nobis at ducimus repudiandae porro sequi nam accusamus. Minima qui saepe ullam cupiditate dolore quos numquam amet fugit.',
  },
  {
    id: 'ca837a9a-5bbe-418d-a074-406f1c4a35f5',
    type: 'Enabler',
    status: 'In Progress',
    title: 'Intuitive intangible capacity',
    created: '2023-01-11T11:16:07.002Z',
    assigned: 'Pam Rippin I',
    description:
      'Vel fugiat voluptatum. Libero quaerat recusandae quibusdam saepe. Unde dolore temporibus. Hic possimus doloribus voluptatum quaerat eius. Quia at tenetur saepe officia rem temporibus impedit.',
  },
  {
    id: 'f9916e11-1614-4a34-ba58-a7ee55fc0d26',
    type: 'Business Value',
    status: 'Verified',
    title: 'Networked uniform attitude',
    created: '2023-01-10T17:11:14.551Z',
    assigned: 'Bennie Waters',
    description:
      'Hic adipisci perspiciatis natus quas nihil molestias. Eos debitis pariatur nulla autem eius nemo doloremque vitae delectus. Impedit asperiores vel vero sed quis eum. Ducimus odio dicta non vitae sapiente sunt aperiam. Corporis ipsum omnis enim quidem.',
  },
  {
    id: 'feba11f9-79d6-4cb2-a35f-faf3fb3755c5',
    type: 'Tech Debt',
    status: 'Archived',
    title: 'Quality-focused static project',
    created: '2023-01-10T23:44:38.607Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Explicabo excepturi perspiciatis non temporibus tenetur. Eaque sed molestiae ipsam voluptate nemo placeat ipsam.',
  },
  {
    id: '5a6e9e29-7090-4b6c-959d-19f514f2ba0e',
    type: 'Business Value',
    status: 'Archived',
    title: 'Synergistic motivating core',
    created: '2023-01-10T21:42:53.828Z',
    assigned: 'Eula Parker',
    description:
      'Adipisci harum voluptatibus dolor impedit enim nesciunt impedit cum quos. Quidem harum ipsam assumenda. Architecto recusandae exercitationem labore facilis omnis.',
  },
  {
    id: 'c3f06fb7-d196-4f01-8fe7-52bc3c53603e',
    type: 'Enabler',
    status: 'In Progress',
    title: 'Down-sized web-enabled superstructure',
    created: '2023-01-10T19:49:48.463Z',
    assigned: 'Eugene Muller',
    description:
      'Odit quis quam laudantium asperiores corrupti nobis voluptas odio. Sequi vel ex maxime quis voluptate inventore exercitationem est. Iste maxime aperiam nulla minus voluptate in nihil minus.',
  },
  {
    id: 'fdb99a0f-27b8-492a-a5b7-c679f9663f99',
    type: 'Feature',
    status: 'Verified',
    title: 'Profound neutral parallelism',
    created: '2023-01-11T04:31:27.345Z',
    assigned: 'Eugene Muller',
    description:
      'Exercitationem dicta quo deserunt nesciunt quod architecto. Nesciunt explicabo provident consequuntur incidunt voluptatum voluptas atque harum autem.',
  },
  {
    id: 'a1a8821b-c319-4e59-b767-139def88a66f',
    type: 'Business Value',
    status: 'Done',
    title: 'Devolved reciprocal database',
    created: '2023-01-11T02:45:06.384Z',
    assigned: 'Eula Parker',
    description:
      'Repellat iure itaque quo fugit nesciunt quos nemo quos. Nulla ullam distinctio vero illo reprehenderit perspiciatis. Recusandae autem animi. Facere rerum facilis eum debitis autem ducimus. Aspernatur rerum quos exercitationem laboriosam vel ipsa fugit quaerat.',
  },
  {
    id: 'f06f1a33-b9af-4b48-9c24-1cc9591990a7',
    type: 'Business Value',
    status: 'Done',
    title: 'User-centric 24/7 archive',
    created: '2023-01-11T11:45:40.909Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Nihil illo veniam. Numquam iusto dolor amet similique hic. Fugiat eveniet quam. Ea quis totam corporis. Incidunt labore neque ea dignissimos explicabo facere cumque quidem expedita.',
  },
  {
    id: 'c6c6f5e3-2f1e-49dd-b66d-527151871bef',
    type: 'Business Value',
    status: 'Archived',
    title: 'Re-contextualized local software',
    created: '2023-01-11T12:52:01.883Z',
    assigned: 'Pam Rippin I',
    description:
      'Atque eos eius aperiam. Accusantium molestias aspernatur nulla commodi rem. Temporibus fugit officia inventore repellat omnis. Id earum ex. Inventore rem sunt nisi vero at.',
  },
  {
    id: 'b4a001f4-78b9-41aa-af01-b164f4b51713',
    type: 'Feature',
    status: 'Archived',
    title: 'Diverse asymmetric Graphic Interface',
    created: '2023-01-11T10:01:00.198Z',
    assigned: 'Bernadette Kreiger',
    description:
      'Molestiae facere voluptas deleniti iste quisquam similique dolores autem. Rerum laborum nostrum natus ipsam doloremque alias. Incidunt iste fuga nulla minima sequi aspernatur tempora.',
  },
  {
    id: 'e805411c-98cc-488d-964d-4ad7e53c6ec6',
    type: 'Enabler',
    status: 'Defined',
    title: 'Configurable local encryption',
    created: '2023-01-11T06:15:06.142Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Perspiciatis praesentium commodi dicta culpa sed occaecati. Facilis veniam assumenda earum ad neque excepturi. Odio omnis illo.',
  },
  {
    id: '99cdbb19-cf6c-43c2-80c2-804b2dfea204',
    type: 'Feature',
    status: 'Archived',
    title: 'Persevering neutral database',
    created: '2023-01-10T18:31:29.246Z',
    assigned: 'Terrell Little',
    description:
      'Labore explicabo dicta asperiores nesciunt perspiciatis. Mollitia doloremque impedit eos pariatur. Natus dolorum voluptate qui. Explicabo delectus cupiditate est.',
  },
  {
    id: '093ec242-60aa-47f2-a104-ea8502081e47',
    type: 'Enabler',
    status: 'Defined',
    title: 'Self-enabling bottom-line complexity',
    created: '2023-01-11T06:05:19.542Z',
    assigned: 'Bennie Waters',
    description:
      'Est temporibus fugiat veniam recusandae accusamus quam laudantium. Quaerat tenetur iste dolorum nesciunt necessitatibus nam maxime deserunt.',
  },
  {
    id: '4c85eeba-17f5-423f-8a20-0c48e194db93',
    type: 'Enabler',
    status: 'Defined',
    title: 'Front-line full-range database',
    created: '2023-01-11T13:19:03.908Z',
    assigned: 'Bernadette Kreiger',
    description:
      'Possimus facere sunt nam. Inventore quidem dicta totam exercitationem non et libero dolorum. Ullam voluptatem id molestias.',
  },
  {
    id: '71f58d7f-fa09-46f5-820e-0d74e422d069',
    type: 'Enabler',
    status: 'Verified',
    title: 'Organized next generation secured line',
    created: '2023-01-10T18:09:49.179Z',
    assigned: 'Eugene Muller',
    description:
      'Nostrum vitae commodi eos aspernatur cumque. Omnis sequi tenetur rem quisquam. Voluptatum facilis fugiat voluptas exercitationem. Excepturi modi modi doloribus magni quam. Soluta eum eveniet architecto fugit. Esse sequi quaerat fuga dolores odio facilis consequuntur accusamus.',
  },
  {
    id: '4a4dec0f-69da-4fc3-8f94-58c321c2d385',
    type: 'Tech Debt',
    status: 'Done',
    title: 'Upgradable 5th generation product',
    created: '2023-01-11T05:31:15.019Z',
    assigned: 'Pam Rippin I',
    description:
      'Nulla voluptas unde perspiciatis consequuntur eum et magni. Ea dignissimos perspiciatis natus ex accusamus necessitatibus. Officia quod odit nulla voluptatibus esse dolorum accusamus repudiandae. Officia dolor non rem sed. Recusandae minima voluptates enim illo. Ratione pariatur saepe nesciunt explicabo ipsam quo soluta eum iste.',
  },
  {
    id: 'a539a7b2-19fa-42e3-a8fd-c88e27aec538',
    type: 'Tech Debt',
    status: 'Defined',
    title: 'Automated maximized matrix',
    created: '2023-01-10T21:04:04.846Z',
    assigned: 'Eugene Muller',
    description:
      'Est soluta fugit recusandae consequuntur recusandae. Quia voluptatibus possimus aut nulla tempora. Occaecati architecto rem.',
  },
  {
    id: 'a23078bb-3857-49ae-96b7-75f3449519c7',
    type: 'Feature',
    status: 'Defined',
    title: 'Open-architected mobile challenge',
    created: '2023-01-11T05:55:14.534Z',
    assigned: 'Eugene Muller',
    description:
      'Nostrum voluptate magni. Praesentium necessitatibus totam assumenda ad magnam magnam molestiae distinctio temporibus. Neque aliquam esse excepturi hic hic. Repellendus quasi facere alias eum. Commodi delectus dolores nihil.',
  },
  {
    id: '9e64fcc9-1224-4cd5-9f46-f111e2fa506a',
    type: 'Business Value',
    status: 'Verified',
    title: 'Persevering 24 hour attitude',
    created: '2023-01-10T16:43:53.419Z',
    assigned: 'Bessie Hayes',
    description: 'Nisi totam dolor ut. Quibusdam numquam aperiam cum excepturi mollitia.',
  },
  {
    id: '63557c80-4de1-466a-b114-d37dc5052a31',
    type: 'Enabler',
    status: 'Verified',
    title: 'Reverse-engineered radical complexity',
    created: '2023-01-10T18:37:32.065Z',
    assigned: 'Eugene Muller',
    description:
      'Cumque quam facere quam provident itaque nam debitis officia molestiae. Voluptatum quos ad quaerat ratione.',
  },
  {
    id: '7d820594-9642-44f3-bc8d-9540e2205f91',
    type: 'Enabler',
    status: 'In Progress',
    title: 'Visionary scalable infrastructure',
    created: '2023-01-11T13:56:23.253Z',
    assigned: 'Bernadette Kreiger',
    description: 'Eveniet a a officiis eum. Aut labore praesentium praesentium. Possimus iusto tenetur.',
  },
  {
    id: 'b5190ec6-980f-4e6e-b5e5-0580ed4b7823',
    type: 'Tech Debt',
    status: 'In Progress',
    title: 'Organized well-modulated info-mediaries',
    created: '2023-01-11T03:40:18.138Z',
    assigned: 'Bessie Hayes',
    description:
      'Quos neque itaque magni placeat ea illo. Amet fugiat nobis placeat doloribus mollitia sapiente. Tempora expedita ratione enim cupiditate architecto aliquam consequatur neque dolore.',
  },
  {
    id: '3e362b96-af3c-4b7d-a181-2bf0fc1f493a',
    type: 'Business Value',
    status: 'In Progress',
    title: 'Digitized dynamic function',
    created: '2023-01-10T17:47:54.816Z',
    assigned: 'Eula Parker',
    description:
      'Similique doloribus in nihil. Laboriosam illum hic officiis autem saepe accusantium. Dolorum animi rerum quaerat aliquam porro aperiam. Et reprehenderit a doloremque mollitia ex molestias. Temporibus quam corrupti inventore veritatis illo.',
  },
  {
    id: '9b221c1c-cb51-478b-9ece-46d36628ebe2',
    type: 'Business Value',
    status: 'Defined',
    title: 'Phased attitude-oriented support',
    created: '2023-01-11T05:22:01.956Z',
    assigned: 'Eugene Muller',
    description:
      'Necessitatibus dignissimos delectus ratione neque. Tempore corrupti magnam. Illo tenetur quasi tempora eius magnam reprehenderit.',
  },
  {
    id: '23d51e1b-a02b-4c8e-9ed4-3d26e6d7e4e2',
    type: 'Feature',
    status: 'Done',
    title: 'Multi-lateral 6th generation product',
    created: '2023-01-11T09:01:40.562Z',
    assigned: 'Bennie Waters',
    description: 'Similique vero vitae aut magnam. Illo voluptate cumque possimus amet aliquid.',
  },
  {
    id: '38775bd0-498b-49a8-861e-317d0f804b3f',
    type: 'Tech Debt',
    status: 'Verified',
    title: 'Mandatory zero tolerance budgetary management',
    created: '2023-01-11T02:23:38.937Z',
    assigned: 'Bessie Hayes',
    description: 'Sequi blanditiis eos ut velit et perspiciatis. Possimus iusto voluptates sunt rerum ad aliquid.',
  },
  {
    id: 'b0fa1707-4e36-4bd9-bf8b-1b76893d81ba',
    type: 'Enabler',
    status: 'Verified',
    title: 'Persistent mission-critical encoding',
    created: '2023-01-11T08:48:24.722Z',
    assigned: 'Terrell Little',
    description:
      'Quia omnis ducimus dolor ab culpa error eaque. Quia dolore culpa ipsam dolores occaecati magnam tempora. Occaecati aliquid tenetur deserunt culpa labore consequuntur delectus in. Mollitia necessitatibus delectus cumque odio. Sapiente dolore a nisi.',
  },
  {
    id: 'b1863757-c8f4-465c-91ed-033190d5cbd5',
    type: 'Feature',
    status: 'Defined',
    title: 'Vision-oriented systematic architecture',
    created: '2023-01-11T11:38:33.553Z',
    assigned: 'Pam Rippin I',
    description:
      'Laborum delectus similique unde deleniti nostrum ad temporibus. Nesciunt accusantium quo voluptate sunt voluptatem quasi laudantium eveniet. Consectetur inventore placeat praesentium consectetur error. Facilis vitae neque quasi iure nam error eos at libero. Perferendis nostrum optio.',
  },
  {
    id: 'eaafb5a8-66bf-431e-9d22-7e06873e1c46',
    type: 'Feature',
    status: 'In Progress',
    title: 'Universal regional archive',
    created: '2023-01-11T02:56:11.580Z',
    assigned: 'Eugene Muller',
    description:
      'Quod iusto placeat saepe totam id. Minima magnam laboriosam perspiciatis numquam laudantium fugiat excepturi nisi. Sit accusamus eius ad a voluptatem nesciunt repudiandae animi recusandae.',
  },
  {
    id: '6a21e23e-c7ed-4c2b-b637-80a8704904e7',
    type: 'Feature',
    status: 'Archived',
    title: 'Public-key 6th generation definition',
    created: '2023-01-11T00:03:23.658Z',
    assigned: 'Bessie Hayes',
    description:
      'Consequatur pariatur ut assumenda repudiandae magnam. Animi animi facilis sapiente delectus autem. Quas libero porro temporibus. Sunt recusandae culpa animi voluptates atque iste natus sapiente voluptatibus. Illo repellat deserunt eius repellat voluptatum. Unde tempore eveniet sint ea voluptates.',
  },
  {
    id: 'bd92323a-367d-4a07-9bbb-00c71fe1d7db',
    type: 'Enabler',
    status: 'Archived',
    title: 'Triple-buffered value-added structure',
    created: '2023-01-11T07:47:34.869Z',
    assigned: 'Eugene Muller',
    description:
      'Corrupti laudantium quis laudantium accusamus eveniet aperiam. Mollitia eos blanditiis voluptate facilis unde dolores quod. Ipsa eveniet ipsa laudantium delectus. Suscipit sed optio quaerat a reprehenderit sapiente. Facere sint dicta praesentium atque dolore assumenda sequi.',
  },
  {
    id: '9aed9736-5e1a-40b9-a0f9-8ded441cde30',
    type: 'Tech Debt',
    status: 'In Progress',
    title: 'Vision-oriented asynchronous Graphical User Interface',
    created: '2023-01-11T01:19:50.586Z',
    assigned: 'Eula Parker',
    description:
      'Nobis dolore reprehenderit sapiente perspiciatis nostrum unde odit ut quo. Libero expedita ea facere accusantium odit neque dicta possimus. Aperiam facere laudantium vitae provident veniam nisi. Quis perspiciatis perspiciatis vitae consequuntur excepturi illum.',
  },
  {
    id: '4983b8bd-1747-4102-bc94-bf1536f347c1',
    type: 'Feature',
    status: 'Archived',
    title: 'Open-architected asynchronous hardware',
    created: '2023-01-11T08:32:36.655Z',
    assigned: 'Bennie Waters',
    description:
      'Error atque sit a cumque voluptatibus veritatis aut. Possimus suscipit reprehenderit molestiae aliquam vero fuga inventore laudantium. Eaque earum reprehenderit minus aspernatur saepe beatae. Rem veniam sit suscipit doloremque. Quod veniam sint harum vel debitis quo. Magni expedita ad ipsam repudiandae tempora atque distinctio odit accusantium.',
  },
  {
    id: 'c03697f7-da25-4f98-a522-2c7c4f8ec4e9',
    type: 'Feature',
    status: 'Archived',
    title: 'Expanded multimedia interface',
    created: '2023-01-11T03:59:00.714Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Culpa dolore facilis aut enim deleniti dolorem. Architecto officia tempora modi voluptate enim. Eum veritatis rem hic debitis ipsa sint eaque neque.',
  },
  {
    id: '18a1d62c-3868-4c8e-b330-5c6c2614aacd',
    type: 'Feature',
    status: 'Done',
    title: 'Triple-buffered clear-thinking flexibility',
    created: '2023-01-10T15:26:31.430Z',
    assigned: 'Eugene Muller',
    description:
      'Quibusdam labore praesentium in ab occaecati numquam ad. Nemo et necessitatibus architecto incidunt pariatur quibusdam voluptatum fuga. Consequuntur repellendus autem cupiditate ipsum nihil. Officia possimus perspiciatis porro nihil autem.',
  },
  {
    id: '8fe5b17a-022c-4f2d-bea3-205d6f55a435',
    type: 'Business Value',
    status: 'Archived',
    title: 'Reverse-engineered uniform access',
    created: '2023-01-11T03:37:48.917Z',
    assigned: 'Eugene Muller',
    description:
      'Repudiandae impedit optio magni illo ipsam. Consequuntur culpa ab soluta occaecati reprehenderit adipisci deleniti.',
  },
  {
    id: 'e14f2903-204a-42d9-97f7-690842f657bb',
    type: 'Enabler',
    status: 'Defined',
    title: 'Up-sized optimal database',
    created: '2023-01-10T14:24:16.695Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Dolorum vero numquam nihil quasi eius iure. Magnam eius amet sed labore nihil asperiores numquam ipsum. Numquam occaecati eligendi magni accusamus molestiae ratione ut cum nemo. Tempore soluta inventore asperiores voluptas magni maxime odio maxime. Labore dolore quia adipisci exercitationem quia adipisci enim. Vero ad quod hic aut neque molestias asperiores explicabo.',
  },
  {
    id: 'bdbedeae-d200-40aa-b800-10d931d21c8e',
    type: 'Business Value',
    status: 'Defined',
    title: 'Sharable composite policy',
    created: '2023-01-11T02:00:50.200Z',
    assigned: 'Bennie Waters',
    description:
      'Sunt possimus a magnam dicta possimus autem facilis in. Magni dolore suscipit. In voluptatem tempora. Ab voluptas illum necessitatibus fuga incidunt aliquid laudantium consequuntur pariatur. Sequi magni nostrum voluptatibus excepturi fugiat nam architecto temporibus exercitationem.',
  },
  {
    id: '76858ae9-78c9-48e9-8a34-e346a9a5ca21',
    type: 'Business Value',
    status: 'Defined',
    title: 'Multi-tiered asymmetric product',
    created: '2023-01-11T12:38:02.618Z',
    assigned: 'Eula Parker',
    description:
      'Deleniti dicta asperiores optio quod cum. At expedita numquam pariatur modi ipsam quas consequuntur. Dicta natus neque minus eligendi dolores quos. Beatae sed repellendus.',
  },
  {
    id: 'd020c7b7-3712-4171-8727-96764df73f73',
    type: 'Enabler',
    status: 'Verified',
    title: 'Stand-alone systemic parallelism',
    created: '2023-01-11T11:43:29.484Z',
    assigned: 'Eugene Muller',
    description: 'Fuga repellat dignissimos eos. Autem pariatur deserunt repellat explicabo ipsam deleniti asperiores.',
  },
  {
    id: 'd366fdc7-8ce7-45bf-a033-067aa7d4a403',
    type: 'Enabler',
    status: 'Verified',
    title: 'Fundamental upward-trending approach',
    created: '2023-01-11T03:31:09.829Z',
    assigned: 'Bennie Waters',
    description:
      'Dolores est amet quibusdam id nam error. Debitis eius blanditiis at iure. Odio necessitatibus voluptatem voluptas iure accusantium dolorem molestiae.',
  },
] as const
const state = reactive({
  activeCard: null as any,
  open: false,
  columns: {
    Defined: [...db.filter((a) => a.status === 'Defined')],
    'In Progress': [...db.filter((a) => a.status === 'In Progress')],
    Done: [...db.filter((a) => a.status === 'Done')],
    Verified: [...db.filter((a) => a.status === 'Verified')],
    Archived: [...db.filter((a) => a.status === 'Archived')],
  },
})

const closeModal = () => {
  setTimeout(() => {
    state.activeCard = null
  }, 500)
}
</script>
