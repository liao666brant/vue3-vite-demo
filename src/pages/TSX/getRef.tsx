import { defineComponent, onMounted, reactive, render } from 'vue';

const One = defineComponent({
  setup(_, { expose }) {
    const state = reactive({
      name: 'TSX getRef component',
    });

    const getInfo = () => {
      console.log('[ getInfo ] 🚀, ', getInfo);
    };

    onMounted(() => {
      getInfo();
    });

    // expose({ getInfo, state });
    return { state };
  },

  render() {
    return (
      <div>
        <p>{this.state.name}</p>
      </div>
    );
  },
});

const Two = defineComponent({
  setup(_, { expose }) {
    const state = reactive({
      name: 'TSX getRef component',
    });

    const getInfo = () => {
      console.log('[ getInfo ] 🚀, ', getInfo);
    };

    onMounted(() => {
      getInfo();
    });

    expose({ getInfo, state });

    return () => (
      <div>
        <p>{state.name}</p>
      </div>
    );
  },
});

export default One;
