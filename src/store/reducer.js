// const defaultState = {
//   locked: false
// }

// export default (state = defaultState, action) => {
//   //reduser里只能接受state 不能直接改变state
//   //reduser是纯函数 
//   console.warn(action.value);

//   // if (action.type === 'changeTabLock') {
//     let { ...newState } = state; //先拷贝一份state
//     // let newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
//     console.warn(newState, '----------');
//     newState.locked = action.value;
//     return newState
//   // }

//   // return state
// }