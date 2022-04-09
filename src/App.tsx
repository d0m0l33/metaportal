import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { NotificationsList } from './components/Transactions/History'
import { GlobalStyle } from './global/GlobalStyle'
import { BadgePage } from './pages/Badges'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/badges" component={BadgePage} />
          <Redirect exact from="/" to="/badges" />
        </Switch>
      </BrowserRouter>
      <NotificationsList />
    </Page>
  )
}
