import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {selectBackend} from '../redux/selectors/backend'
import {selectToken} from '../redux/selectors/token'

export const ApolloProviderWithAuth: React.FC = ({children}) => {
  const backend = useSelector(selectBackend)
  const token = useSelector(selectToken)

  const client = useMemo(() => {
    return new ApolloClient({
      uri: backend ?? undefined,
      headers: token ? {authorization: `Bearer ${token}`} : undefined,
      cache: new InMemoryCache({
        dataIdFromObject: (object: any) => object.uuid || null,
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    })
  }, [token, backend])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
