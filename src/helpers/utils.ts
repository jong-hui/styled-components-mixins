import get from "lodash.get";
import { FlattenSimpleInterpolation } from "styled-components";
import database from "../mixins/database";

export const STYLE_MIXINS_FALLBACK = ""

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

function isDevlopment() {
  return process.env.NODE_ENV === 'development'
}

export function styleMixins<
  K extends keyof typeof database
>(
  mixinsName: K | (K)[]
): FlattenSimpleInterpolation | FlattenSimpleInterpolation[] | string {
  // if mixinsName is String
  const isAbleKey = (
    typeof mixinsName === "string" ||
    typeof mixinsName === "number"
  )
  const mixin = get(database, mixinsName) as FlattenSimpleInterpolation
  const findMixin = typeof mixin === "undefined"

  if (
    isAbleKey &&
    findMixin
  ) {
    return mixin
  }
  
  if (
    isAbleKey &&
    !findMixin
  ) {
    if (isDevlopment()) {
      console.warn(`[styled-components-mixins] mixin ("${mixinsName}") could not be found in mixins database`)
      throw new Error(`[styled-components-mixins] mixin ("${mixinsName}") could not be found in mixins database`)
    }
    
    return STYLE_MIXINS_FALLBACK
  }
  // if mixinsName is String

  // if mixinsName is Object
  const isObject = (
    typeof mixinsName === "object"
  )

  const isArrayLengthMoreZero = (
    typeof mixinsName === "object" &&
    mixinsName.length > 0
  )

  const mixinsNames = mixinsName as K[]

  if (
    isObject && 
    !isArrayLengthMoreZero
  ) {
    if (isDevlopment()) {
      console.warn(`[styled-components-mixins] mixinName look's like empty array`)
      throw new Error(`[styled-components-mixins] mixinName look's like empty array`)
    }

    return STYLE_MIXINS_FALLBACK
  }

  if (
    isObject &&
    isArrayLengthMoreZero
  ) {
    return mixinsNames.reduce((acc: (typeof database[K])[], cur) => {
      const mixin = styleMixins(cur)
      const isFailToFind = mixin === STYLE_MIXINS_FALLBACK

      if (isFailToFind) {
        return acc
      }

      return [
        ...acc,
        mixin
      ]
    }, []) as FlattenSimpleInterpolation[]
  }

  if (typeof mixinsName === "string" && database[mixinsName] !== undefined) {
    return database[mixinsName]
  } else if (typeof mixinsName === "string" && database[mixinsName] === undefined) {
    throw new Error("mixinsName undefined in database")
  }

  if (typeof mixinsName === "object" && mixinsName.length > 0) {
    return mixinsName.reduce((acc: (typeof database[K])[], cur) => {
      if (database[cur] !== undefined) {
        return [
          ...acc,
          database[cur]
        ]
      }

      return acc
    }, [])
  }

  if (process.env.NODE_ENV) {
    
  }

  return STYLE_MIXINS_FALLBACK
}