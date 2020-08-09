import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {ApolloProvider} from '@apollo/react-hooks'
import {selectToken} from '../redux/selectors/token'
import ApolloClient from 'apollo-boost'

export const ApolloProviderWithAuth: React.FC = ({children}) => {
  const token = useSelector(selectToken)

  const client = useMemo(() => {
    return new ApolloClient({
      uri: 'http://localhost:4000',
      headers: token ? {authorization: token} : undefined,
    })
  }, [token])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
