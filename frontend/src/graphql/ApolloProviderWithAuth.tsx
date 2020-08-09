import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {selectToken} from '../redux/selectors/token'

export const ApolloProviderWithAuth: React.FC = ({children}) => {
  const token = useSelector(selectToken)

  const client = useMemo(() => {
    return new ApolloClient({
      uri: 'http://localhost:4000',
      headers: token ? {authorization: token} : undefined,
      cache: new InMemoryCache(),
    })
  }, [token])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
