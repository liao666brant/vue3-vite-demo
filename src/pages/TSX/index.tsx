import { defineComponent, onMounted, ref } from 'vue';

import GetRef from './getRef';

export default defineComponent({
  setup() {
    const $ref = ref(null);

    onMounted(() => {
      console.log($ref.value);
    });

    const handelClick = () => {
      console.log($ref.value);
    };

    return () => (
      <div>
        Index
        <GetRef ref={$ref} />
        <button onClick={handelClick}>click</button>
      </div>
    );
  },
});
