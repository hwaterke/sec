import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'

const intDivision = (a, b) => Math.floor(a / b)

const secondsToHuman = seconds => {
  const deltas = [[24 * 60 * 60, 'd'], [60 * 60, 'h'], [60, 'm']]

  for (const [delta, suffix] of deltas) {
    if (seconds >= delta) {
      return `${intDivision(seconds, delta)}${suffix} ${secondsToHuman(
        seconds % delta
      )}`
    }
  }

  return `${seconds}s`
}

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

    return <Text>{secondsToHuman(seconds)}</Text>
  }
}
