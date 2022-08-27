import { fabric } from 'fabric';

interface State {
  saveLen: number;
  deleLen: number;
  operateIndex: number;
}

class CanvasOperation {
  canvas: fabric.Canvas;
  state: State;
  saveOperateList: any[];
  deleteOperateList: any[];

  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;

    this.state = {
      saveLen: 0,
      deleLen: 0,
      operateIndex: -1,
    };

    this.saveOperateList = [];
    this.deleteOperateList = [];
  }

  // 操作保存的数据
  OPERATE_OPERATE_DATA() {
    const json = this.canvas.toDatalessJSON();
    if (this.state.deleLen > 0) {
      this.deleteOperateList.some((item) => {
        this.saveOperateList[item].del = true;
      });
      this.saveOperateList = this.saveOperateList.filter((item) => {
        return !item.del;
      });
      this.deleteOperateList = [];
      this.saveOperateList.push(json);
      this.state.operateIndex = this.saveOperateList.length - 1;
    } else {
      this.saveOperateList.push(json);
      this.state.operateIndex += 1;
    }
    this.state.saveLen = this.saveOperateList.length;
    this.state.deleLen = this.deleteOperateList.length;
  }

  // 上一步操作
  PREV_STEP_OPERATE() {
    const state = this.state;
    if (state.operateIndex > 0) {
      this.canvas
        .loadFromJSON(this.saveOperateList[this.state.operateIndex - 1], () => {})
        .renderAll();
      if (this.deleteOperateList.includes(state.operateIndex - 1)) {
        console.log('[ this.deleteOperateList ] 🚀, ', this.deleteOperateList);
      } else {
        this.deleteOperateList.push(state.operateIndex);
        state.operateIndex -= 1;
      }
    }
    state.saveLen = this.saveOperateList.length;
    state.deleLen = this.deleteOperateList.length;
  }
  // 下一步操作
  NEXT_STEP_OPERATE() {
    const state = this.state;
    if (state.operateIndex + 1 >= this.saveOperateList.length) {
      return;
    }
    this.canvas.loadFromJSON(this.saveOperateList[state.operateIndex + 1], () => {}).renderAll();
    if (this.deleteOperateList.includes(state.operateIndex + 1)) {
      const index = this.deleteOperateList.indexOf(state.operateIndex + 1);
      this.deleteOperateList.splice(index, 1);
    } else {
      console.log('[ this.deleteOperateList ] 🚀, ', this.deleteOperateList);
    }
    state.operateIndex = state.operateIndex + 1;
    state.saveLen = this.saveOperateList.length;
    state.deleLen = this.deleteOperateList.length;
  }
}

export default CanvasOperation;
