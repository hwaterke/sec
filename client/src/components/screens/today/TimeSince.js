import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'

const Text = styled.Text`
  font-size: 40px;
`

export class TimeSince extends React.Component {
  static propTypes = {
    time: PropTypes.object.isRequired,
  }

  state = {
    now: moment(),
  }

  tick = () => {
    this.setState({now: moment()})
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  render() {
    const seconds = Math.round(
      moment.duration(this.state.now.diff(this.props.time)).as('seconds')
    )

    return (
      <Text>
        {seconds > 60
          ? `${Math.floor(seconds / 60)}m ${seconds % 60}s`
          : `${seconds}s`}
      </Text>
    )
  }
}
