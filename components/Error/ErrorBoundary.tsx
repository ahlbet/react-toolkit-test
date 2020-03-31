import React, { Component, ReactNode } from 'react'
import Rollbar from 'rollbar'

import ComponentErrorScreen from 'Elements/Error/ComponentErrorScreen'
import { Nullable } from '../../types/generic';

interface Error {
  message: string
}

interface Props {
  children: ReactNode;
  fallbackComponent?: ReactNode;
}

interface State {
  error: Nullable<Error>;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return {
      error
    };
  }

  componentDidCatch(error: Error) {
    const rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
    })

    rollbar.critical(error.message)
  }

  renderFallbackComponent = () => {
    const { fallbackComponent } = this.props
    const { error } = this.state

    return fallbackComponent ? fallbackComponent : <ComponentErrorScreen message={error.message} />
  }

  render() {
    const { children } = this.props
    const { error } = this.state

    return error ? this.renderFallbackComponent() : children
  }
}

export default ErrorBoundary
