import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
  flagValue: string;
}

const FeatureFlag = (props: Props) => {
  const { children, flagValue } = props

  const displayFeature = !!(flagValue && flagValue !== 'false')

  return displayFeature ? <>{children}</> : null
}

export default FeatureFlag
