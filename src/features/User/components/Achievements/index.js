// @flow

import type { AchievementGroups, AchievementCategories, Achievements } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Container from 'common/components/Container';

const mapStateToProps = (state) => ({
  achievements: state.users.data[state.users.selected],
  achievementGroups: state.achievementGroups,
  achievementCategories: state.achievementCategories,
});

type Props = {
  fetchAchievementGroups: () => void,
  fetchAchievementCategories: () => void,
  achievementGroups: AchievementGroups,
  achievementCategories: AchievementCategories,
  achievements: Achievements,
};

export default connect(mapStateToProps, {
  fetchAchievementGroups: actions.fetchAchievementGroups,
  fetchAchievementCategories: actions.fetchAchievementCategories,
})(
class UserAchievements extends Component {
  props: Props;

  componentWillMount () {
    this.props.fetchAchievementGroups('4E6A6CE7-B131-40BB-81A3-235CDBACDAA9');
    this.props.fetchAchievementCategories(1);
  }

  render () {
    return (
      <Container>
        achieve!
      </Container>
    );
  }
}
);
