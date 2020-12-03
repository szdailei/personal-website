const speakModeReq = `
@pain
20200601，代磊演示时在便携机和投影仪上显示相同的内容，忘记要说的话。
@expect
20201111，代磊演示时在便携机上显示演讲备注、投影仪显示胶片内容，方便讲解。
@status
20200601，MS Office将ppt文件内容输出到屏幕上。
@goal
20201111，在http://127.0.0.1上，浏览器将md文件内容输出到投影仪端口、
md里面的Note组件内容输出到投影仪端口。`;
describe(speakModeReq, () => {
  const splitScreenReq = `按动P键，浏览器创建新tab显示md文件的Note。
新tab输出到主显示端口，原tab输出到次端口。
切换到新tab。
原tab和新tab同步`;
  test.skip(splitScreenReq, async () => {
  });
});
