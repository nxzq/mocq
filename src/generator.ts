import { DataSource, Overrides } from "./types";

type DataGenerator<T> = {
  generate: (props?: { count?: number, overrides?: Overrides<T>}) => T[]
}

const generateDataSeed = <T>(index: number, dataSource: DataSource<T>, overrides: Overrides<T>): T => {
  const dataSeed = {}
  const keys = Object.keys(dataSource) as Array<keyof T>
  const hasOverrides = Object.keys(overrides).length > 0
  for (const key of keys) {
    Object.defineProperty(dataSeed, key, {
      value: (hasOverrides && overrides[key as keyof T]) ? overrides[key as keyof T]!(index) : dataSource[key](index)
    });
  }
  return dataSeed as T
}

const defaultGeneratorProps = {
  count: 1,
  overrides: {}
}

export const createGenerator = <T>(dataSource: DataSource<T>): DataGenerator<T> => {
  const generate = (props?: { count?: number, overrides?: Overrides<T>}): T[] => {
    const { count, overrides } = { ...defaultGeneratorProps, ...props }
    return Array.from({ length: count }).map((_,i) => generateDataSeed<T>(i, dataSource, overrides))
  }
  return {
    generate
  }
}