import { MockDataGenerator, Overrides } from "./types";

type DataGenerator<T> = {
  generate: (props?: { count?: number, overrides?: Overrides<T>}) => T[]
}

const generateDataSeed = <T extends object>(index: number, generator: MockDataGenerator<T>, overrides: Overrides<T>): T => {
  const dataSeed = generator(index)
  const keys = Object.keys(dataSeed) as Array<keyof T>
  const hasOverrides = Object.keys(overrides).length > 0
  for (const key of keys) {
    Object.defineProperty(dataSeed, key, {
      value: (hasOverrides && overrides[key as keyof T]) ? overrides[key as keyof T]!(index) : dataSeed[key]
    });
  }
  return dataSeed as T
}

const defaultGeneratorProps = {
  count: 1,
  overrides: {}
}

export const createGenerator = <T extends object>(generator: MockDataGenerator<T>): DataGenerator<T> => {
  const generate = (props?: { count?: number, overrides?: Overrides<T>}): T[] => {
    const { count, overrides } = { ...defaultGeneratorProps, ...props }
    return Array.from({ length: count }).map((_,i) => generateDataSeed<T>(i, generator, overrides))
  }
  return {
    generate
  }
}