import { describe, expect, it } from 'vitest'
import { fixtureBreedingCage } from '../test/fixtures'
import { sortBreedingCages } from './cageSorting'

describe('sortBreedingCages', () => {
  it('moves complete records in numeric cage order without changing labels or mouse data', () => {
    const cages = ['10', '2', '1'].map((cage, index) => ({
      ...fixtureBreedingCage,
      id: `breeding-${cage}`,
      cage,
      maleDob: `2026-01-0${index + 1}`,
      femaleDob: `2026-02-0${index + 1}`,
      pairing: `pair-${cage}`,
      extraFemale: `extra-${cage}`,
      pupsCount: index + 3,
      notes: `notes-${cage}`,
      customFields: { location: `rack-${cage}` },
    }))
    const before = structuredClone(cages)
    const sorted = sortBreedingCages(cages)

    expect(sorted.map(cage => cage.cage)).toEqual(['1', '2', '10'])
    sorted.forEach(cage => expect(cage).toBe(cages.find(original => original.id === cage.id)))
    expect(cages).toEqual(before)
    expect(sorted).not.toBe(cages)
  })

  it('groups lines and sorts prefixed cage labels naturally', () => {
    const cages = [
      { ...fixtureBreedingCage, line: 'RGS2', cage: 'B10' },
      { ...fixtureBreedingCage, line: 'Prex1', cage: 'B2' },
      { ...fixtureBreedingCage, line: 'RGS2', cage: 'B2' },
    ]
    expect(sortBreedingCages(cages).map(cage => [cage.line, cage.cage])).toEqual([
      ['Prex1', 'B2'], ['RGS2', 'B2'], ['RGS2', 'B10'],
    ])
    expect(sortBreedingCages([])).toEqual([])
  })
})
