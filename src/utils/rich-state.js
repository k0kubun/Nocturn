export default class RichState {
  constructor(store) {
    this.state = store.getState();
  }

  activeAccount() {
    if (this.activeAccountCache) return this.activeAccountCache;
    return this.activeAccountCache = this.state.accounts[this.state.activeAccountIndex];
  }

  activeTab() {
    if (this.activeTabCache) return this.activeTabCache;
    return this.activeTabCache = (this.state.selectedTabByUserId[this.activeAccount().id_str] || 'home');
  }

  activeListId() {
    return this.activeAccount() &&
      this.state.activeListIdByUserId[this.activeAccount().id_str];
  }

  activeSearchQuery() {
    return this.activeAccount() &&
      this.state.searchQueryByUserId[this.activeAccount().id_str];
  }

  nextTab() {
    return {
      home:     'mentions',
      mentions: 'lists',
      lists:    'search',
      search:   'search',
    }[this.activeTab()];
  }

  prevTab() {
    return {
      home:     'home',
      mentions: 'home',
      lists:    'mentions',
      search:   'lists',
    }[this.activeTab()];
  }

  nextAccountIndex() {
    let index = this.state.activeAccountIndex + 1;
    if (index >= this.state.accounts.length) {
      return this.state.activeAccountIndex;
    } else {
      return index;
    }
  }

  prevAccountIndex() {
    let index = this.state.activeAccountIndex - 1;
    if (index < 0) {
      return this.state.activeAccountIndex;
    } else {
      return index;
    }
  }

  selectedTweetId() {
    if (this.selectedTweetIdCache) return this.selectedTweetIdCache;
    return this.selectedTweetIdCache = (
      this.state.selectedTweetIdsByUserId[this.activeAccount().id_str] &&
      this.state.selectedTweetIdsByUserId[this.activeAccount().id_str][this.activeTab()]
    );
  }

  activeTabTweets() {
    if (this.activeTabTweetsCache) return this.activeTabTweetsCache;
    return this.activeTabTweetsCache = (
      this.state.tabsByUserId[this.activeAccount().id_str] &&
      this.state.tabsByUserId[this.activeAccount().id_str][this.activeTab()]
    ) || [];
  }

  latestMention() {
    let mentions = this.state.tabsByUserId[this.activeAccount().id_str] &&
      this.state.tabsByUserId[this.activeAccount().id_str]['mentions'] || [];
    return mentions[0];
  }

  activeTweet() {
    if (this.activeTweetCache) return this.activeTweetCache;
    return this.activeTweetCache = this.findTweet(
      this.activeTabTweets(),
      this.selectedTweetId(),
    );
  }

  findNextTweet() {
    let activeIndex = this.findTweetIndex(this.activeTabTweets(), this.selectedTweetId());
    if (activeIndex == null) return null;
    return this.activeTabTweets().slice(activeIndex).slice(1)[0];
  }

  findPrevTweet() {
    let activeIndex = this.findTweetIndex(this.activeTabTweets(), this.selectedTweetId());
    if (activeIndex == null || activeIndex == 0) return null;
    return this.activeTabTweets()[activeIndex-1];
  }

  findFirstTweet() {
    return this.activeTabTweets()[0];
  }

  findTweet(tweets, id_str) {
    let index = this.findTweetIndex(tweets, id_str);
    if (index == null) return null;
    return tweets[index];
  }

  findTweetIndex(tweets, id_str) {
    if (!tweets || !id_str) return null;
    for (let i in tweets) {
      if (tweets[i].id_str === id_str) return i;
    }
    return null;
  }
}
