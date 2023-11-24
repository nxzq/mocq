import { faker } from '@faker-js/faker'
import { expect, test } from 'bun:test'
import { Workflow, Overrides } from './types';

import { mocquer } from '.'
import { createWorkflow } from './workflow';

test("[workflow]", () => {
  const assetDataSource = {
    id: faker.string.uuid,
    name: faker.company.name
  }

  type Asset = {
    id: string
    name: string
  }
  
  const instanceDataSource = {
    id: faker.string.uuid,
    asset_id: faker.string.uuid,
    name: faker.company.buzzNoun
  }

  type Instance = {
    id: string
    asset_id: string
    name: string
  }

  const assetGenerator = mocquer.createGenerator<Asset>(assetDataSource)
  const instanceGenerator = mocquer.createGenerator<Instance>(instanceDataSource)
  const workflowConfig: Workflow = {
    actions: [
      {
        name: 'assets',
        generator: assetGenerator,
        count: 2,
      },
      {
        name: 'instances',
        generator: instanceGenerator,
        count: 5,
        connections: [
          {
            actionName: 'assets',
            callback: (data: Asset[]) => {
              //        ^?
              return { asset_id: () => faker.helpers.arrayElement(data).id }
              //                                                   ^?
            },
          }
        ]
      }
    ]
  }

  const _workflow = createWorkflow(workflowConfig);

  const { data } = _workflow.execute()
  expect(data).toHaveProperty('assets')
  expect(data).toHaveProperty('instances')
});
