import { RootState, selectors } from 'Redux/Store'
import * as types from 'types'

import { getRandomEntity } from 'Redux/helpers'

import { rollNemesisId } from './rollNemesisId'
import { getStillAvailableNemesisIds } from './getStillAvailableNemesisIds'
import { getUpgradedBasicNemesisCardsResult } from './getUpgradedBasicNemesisCardsResult'

export const generateResult = (
  battle: types.Battle,
  nemesisId: string,
  upgradedBasicNemesisCardIds: string[],
  nemesisSeedState?: Object
) => {
  return {
    battle: {
      ...battle,
      nemesisId,
      status: 'before_battle',
    },
    upgradedBasicNemesisCardIds,
    nemesisSeedState: nemesisSeedState || true,
  }
}

export const createBattle = (
  getState: () => RootState,
  battle: types.Battle,
  getEntity: types.SeededEntityGetter = getRandomEntity
) => {
  const state = getState()

  const expedition = selectors.Expeditions.Expeditions.getExpeditionById(
    state,
    { expeditionId: battle.expeditionId }
  )

  const availableNemeses = selectors.getAvailableNemesisForExpeditionId(state, {
    expeditionId: expedition.id,
  })
  const previousNemesisIds = selectors.Expeditions.Expeditions.getPreviousNemesesByExpeditiionId(
    state,
    { expeditionId: expedition.id }
  )

  const stillAvailableNemesisIds = getStillAvailableNemesisIds(
    availableNemeses,
    previousNemesisIds,
    battle.nemesisTier
  )

  const nemesisIdResult = rollNemesisId(
    stillAvailableNemesisIds,
    availableEntities =>
      getEntity(availableEntities, {
        seed: expedition.seed.seed,
        state: expedition.seed.nemesisState,
      })
  )

  // FIXME Should probably be composed into another "getStillAvailable" selector
  const previousUpgradedBasicNemesisCards = expedition.upgradedBasicNemesisCards
  const availableUpgradedBasicNemesisCards = selectors.getAvailableUpgradedBasicNemesisCardsForExpeditionId(
    state,
    {
      expeditionId: battle.expeditionId,
    }
  )

  const upgradedBasicNemesisCardIdsResult = getUpgradedBasicNemesisCardsResult(
    battle.nemesisTier,
    availableUpgradedBasicNemesisCards,
    previousUpgradedBasicNemesisCards,
    getEntity,
    nemesisIdResult.seed
  )

  return generateResult(
    battle,
    nemesisIdResult.result,
    upgradedBasicNemesisCardIdsResult.result,
    upgradedBasicNemesisCardIdsResult.seed.state
  )
}
