import { PropTypes } from 'react';
import startCase from 'lodash/startCase';
import includes from 'lodash/includes';
import get from 'lodash/get';
import T from 'i18n-react';

import SimpleTooltip from '../Simple';
import colours from 'common/styles/colours.less';
import { markup, attributeToName } from 'lib/gw2/parse';

import ItemHeader from '../ItemHeader';
import Gold from '../Gold';
import Upgrade from '../Upgrade';
import Infusion from '../Infusion';
import Background from '../Background';

function buildName (item, skin, upgrades) {
  if (!skin.name) {
    return item.name;
  }

  const regex = /[\w'-]+/;
  const prefix = regex.exec(item.name);
  const prefixedName = `${prefix} ${skin.name}`;

  const [upgradeOne] = upgrades;

  if (upgradeOne && prefixedName.indexOf(upgradeOne.details.suffix)) {
    return `${prefixedName} ${upgradeOne.details.suffix}`;
  }

  return prefixedName;
}

const ItemsTooltip = ({ data: {
  item,
  skin,
  name,
  upgrades,
  upgradeCounts,
  infusions,
  stats: { attributes = {} },
} }) => {
  if (Object.keys(item).length === 0) {
    return <Background><SimpleTooltip data={name} /></Background>;
  }

  const isTransmuted = !!skin.name;
  const isEquip = true; // TODO: Fill in.
  const isFromCharacter = false; // TODO: Fill in.

  return (
    <Background>
      {isFromCharacter && <SimpleTooltip data={T.translate('items.currentlyEquipped')} />}

      <ItemHeader
        name={buildName(item, skin, upgrades)}
        icon={skin.icon || item.icon}
        rarity={item.rarity}
      />

      <div>
        {item.details && !!item.details.defense && (
          <div>
            {T.translate('items.defense')}:
            <span className={colours.green}> {item.details.defense}</span>
          </div>)}

        {item.type === 'Weapon' && <div>
          <span>{T.translate('items.weaponStrength')}: </span>
          <span className={colours.green}>
            {`${item.details.min_power} - ${item.details.max_power}`}
          </span>
        </div>}

        {get(item, 'details.infix_upgrade.attributes', []).map(({ modifier, attribute }) => (
          <div key={attribute} className={colours.green}>
            {`+${modifier} ${attributeToName(attribute)}`}
          </div>
        ))}

        {item.type === 'UpgradeComponent' && !includes(item.name, 'Infusion') && get(item, 'details.infix_upgrade.buff.description', []).map((buff) => (
          <div key={buff}>
            {markup(buff)}
          </div>
        ))}

        {Object.keys(attributes).map((attribute) => {
          const modifier = attributes[attribute];

          return (
            <div key={attribute} className={colours.green}>
              {`+${modifier} ${attributeToName(attribute)}`}
            </div>
          );
        })}

        {item.details && <span className={colours.green}>
          {markup(item.details.description, '\n')}
        </span>}

        {get(item, 'details.bonuses', []).map((bonusName, bonusId) => (
          <div className={colours.blue}>
            {markup(`(${bonusId + 1}): ${bonusName}`)}
          </div>
        ))}

        <br />

        {upgrades.map((upgrade) =>
          <span key={upgrade.id}>
            <Upgrade data={upgrade} count={upgradeCounts[upgrade.id]} /><br />
          </span>
        )}

        {infusions.map((infusion, index) =>
          // eslint-disable-next-line react/no-array-index-key
          <span key={index}>
            <Infusion data={infusion} /><br />
          </span>
        )}

        {isEquip && (
          <div>
            {isTransmuted
              ? T.translate('items.transmuted')
              : T.translate('items.skinLocked')}
          </div>
        )}

        <div>{item.name}</div>

        <div>{item.rarity}</div>

        {item.details && <div>{item.details.weight_class}</div>}

        {item.details && <div>{startCase(item.details.type)} {startCase(item.type)}</div>}

        <div>{markup(item.description)}</div>

        {!!item.level && <div>{T.translate('items.requiredLevel')}: {item.level}</div>}

        <div>{item.boundStatus}</div>

        {item.rarity !== 'Legendary' &&
          <Gold copper={item.copper} silver={item.silver} gold={item.gold} />}
      </div>
    </Background>
  );
};

ItemsTooltip.propTypes = {
  data: PropTypes.object,
};

export default ItemsTooltip;
