import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GameDetail from './gameDetail/GameDetail';
import Rating from './rating/Rating'
import Recommendation from './recommendation/Recommendation'
import Collection from './collection/Collection'
import Keyword from './keyword/Keyword'
import Company from './company/Company'
import Category from './category/Category'
import Search from './search/Search'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Rating}/>
      <Route exact path='/rating' component={Rating}/>
      <Route path='/recommendation' component={Recommendation}/>
      <Route path='/collection' component={Collection}/>
      <Route path='/game/:slug' component={GameDetail}/>
      <Route path='/keyword/:tag' component={Keyword}/>
      <Route path='/company/:company' component={Company}/>
      <Route path='/category/:categoryName' component={Category}/>
      <Route path='/search/:search' component={Search}/>
    </Switch>
  </main>
)

export default Main
