import React from 'react'

import { ICard } from '../../../../../types'

import AbilityText from '../../../../AbilityText'
import InfoItem from '../../../../InfoItem'

import Name from './Name'

import List from '@material-ui/core/List'

type Props = {
  card: ICard
}

const Body = React.memo(({ card }: Props) => (
  <React.Fragment>
    <Name>{card.name}</Name>
    <List>
      <InfoItem label="Type" info={card.type} />
      <InfoItem label="Cost" info={card.cost.toString()} />
    </List>

    <AbilityText
      dangerouslySetInnerHTML={{
        __html: card.effect || '',
      }}
    />
    {card.keywords ? card.keywords.map((keyword: string) => keyword) : null}
  </React.Fragment>
))

export default Body
