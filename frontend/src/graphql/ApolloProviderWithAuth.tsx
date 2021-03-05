import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {selectToken} from '../redux/selectors/token'
import {selectBackend} from '../redux/selectors/backend'
import {View, Text} from 'react-native'

export const ApolloProviderWithAuth: React.FC = ({children}) => {
  const backend = useSelector(selectBackend)
  const token = useSelector(selectToken)

  if (!backend) {
    return (
      <View>
        <Text>No backend specified</Text>
      </View>
    )
  }

  const client = useMemo(() => {
    return new ApolloClient({
      uri: backend,
      headers: token ? {authorization: token} : undefined,
      cache: new InMemoryCache({
        dataIdFromObject: (object: any) => object.uuid || null,
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    })
  }, [token])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
