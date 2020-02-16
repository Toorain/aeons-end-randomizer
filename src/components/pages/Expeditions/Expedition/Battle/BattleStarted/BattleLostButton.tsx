import React from 'react'

import Button from '@material-ui/core/Button'

type Props = {
  handleLoss: () => void
}

const BattleLostButton = ({ handleLoss }: Props) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="secondary"
      onClick={handleLoss}
    >
      Battle lost
    </Button>
  )
}

export default React.memo(BattleLostButton)
