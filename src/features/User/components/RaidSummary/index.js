import ProgressBar from 'common/components/ProgressBar';
import Summary from 'common/layouts/Summary';
import T from 'i18n-react';
import Redacted from 'common/components/Redacted';

const RAID_KILL_ACHIEVEMENTS = {
  2654: 'Vg', // Vale Guardian
  2667: 'Gors', // Gorseval
  2659: 'Sab',  // Sabetha
  2826: 'Cm', // Cave Monster
  3017: 'Xr', // Xera
  3014: 'Kc', // Keep Construct
  2836: 'Mt', // Matthias
  3321: 'Mrst', // Mursaat Overseer
  3347: 'Smg', // Samarog
  3349: 'Crn', // Cairn the Indomitable
  3364: 'Dmn', // Demon
};

const TOTAL_KILLS = Object.keys(RAID_KILL_ACHIEVEMENTS).length;

const RaidSummary = ({ userAchievements, className, simple }) => {
  const redact = !userAchievements.length;
  const achievements = userAchievements.filter(
    ({ id, done }) => RAID_KILL_ACHIEVEMENTS[id] && done
  );

  const raidKills = `${T.translate('accSummary.raidBossKills')} ${achievements.map(({ id }) =>
    `[${RAID_KILL_ACHIEVEMENTS[id]}]`).join('')}`;

  if (simple) {
    return <span>{raidKills}</span>;
  }

  return (
    <Summary
      className={className}
      leftIcon={{ name: 'raid.png', size: 'xlarge' }}
      title={<Redacted redact={redact}>{raidKills}</Redacted>}
      subTitle={
        <ProgressBar
          current={achievements.length}
          max={TOTAL_KILLS}
        />
      }
    />
  );
};

export default RaidSummary;
