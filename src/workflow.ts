import { Overrides, Workflow } from './types';

export const createWorkflow = (workflow: Workflow) => {
  const execute = () => {
    const { actions, preHandler, postHandler } = workflow
    //       ^?
    const context = {}
    // order actions TODO
    // generate data
    for (const action of actions) {
      if (action.connections) {
        let overrides = {}
        for (const connection of action.connections) {
          overrides = { ...overrides, ...connection.callback(context[connection.actionName])}
        }
        Object.defineProperty(context, action.name, {
          value: action.generator.generate({ count: action.count, overrides })
        });
      }
      else {
        Object.defineProperty(context, action.name, {
          value: action.generator.generate({ count: action.count })
        });
      }
    }
    // execute callbacks
    if (preHandler)
      preHandler()
    for (const action of actions) {
      if (action.handler) {
        if (action.handler.execType === 'batch')
          action.handler.callback(context[action.name])
        else if (action.handler.execType === 'iterate')
          context[action.name].map(x => action.handler.callback(x))
      }
    }
    if (postHandler)
      postHandler()
    return { data: context }
  }
  return {
    execute
  }
}