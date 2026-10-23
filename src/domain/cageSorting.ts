import type { BreedingCage } from '../types'

export function sortBreedingCages(cages: BreedingCage[]): BreedingCage[] {
  return [...cages].sort((left, right) => {
    const options = { numeric: true, sensitivity: 'base' } as const
    return left.line.localeCompare(right.line, undefined, options)
      || left.cage.localeCompare(right.cage, undefined, options)
  })
}
