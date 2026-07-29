import assert from "node:assert/strict"
import test from "node:test"

import { adjectives, animals } from "unique-names-generator"

import { generateSlug } from "../features/workflows/lib/generate-slug.ts"

const adjectiveSet = new Set(adjectives)
const animalSet = new Set(animals)

test("generates a lowercase hyphenated adjective-animal slug", () => {
  for (let index = 0; index < 25; index += 1) {
    const slug = generateSlug()
    const [adjective, animal] = slug.split("-")

    assert.match(slug, /^[a-z]+-[a-z]+$/)
    assert.equal(slug.split("-").length, 2)
    assert.equal(adjectiveSet.has(adjective), true)
    assert.equal(animalSet.has(animal), true)
  }
})
