import { DataSource, Overrides, Generator } from "./types";

const generateDataSeed = <T>(dataSource: DataSource, overrides: Overrides<T>): T => {
  const dataSeed = {}
  const hasOverrides = Object.keys(overrides).length > 0
  for (const [key, value] of Object.entries(dataSource)) {
    Object.defineProperty(dataSeed, key, {
      value: (hasOverrides && overrides[key as keyof T]) ? overrides[key as keyof T]!() : value()
    });
  }
  return dataSeed as T
}

const defaultGeneratorProps = {
  count: 1,
  overrides: {}
}

export const createGenerator = <T>(dataSource: DataSource): Generator<T> => {
  const generate = (props?: { count?: number, overrides?: Overrides<T>}): T[] => {
    const { count, overrides } = { ...defaultGeneratorProps, ...props }
    return Array.from({ length: count }).map(() => generateDataSeed<T>(dataSource, overrides))
  }
  return {
    generate
  }
}