import React from 'react'
import { withTheme } from 'styled-components/macro'

import { Nemesis } from '../../../../types'

import Tile from '../../../Tile'

import Body from './Body'

type Props = {
  nemesis: Nemesis
  showNemesisDetails: (id: string) => void
  theme: any
}

const NemesisTile = React.memo(
  ({ nemesis, showNemesisDetails, theme }: Props) => {
    return (
      <Tile
        body={<Body nemesis={nemesis} />}
        bgColor={theme.colors.turnOrderCards.nemesis.normal}
        fontColor={theme.colors.white}
        icon={theme.icons.nemesis}
        iconColor={theme.colors.cards.nemesis.color}
        showDetails={() => showNemesisDetails(nemesis.id)}
      />
    )
  }
)

NemesisTile.displayName = 'NemesisTile'

export default withTheme(NemesisTile)
