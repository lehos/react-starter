import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = {
    error: null as any,
  };

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    if (!this.state.error) return this.props.children;

    return <>Something went wrong</>;
  }
}
