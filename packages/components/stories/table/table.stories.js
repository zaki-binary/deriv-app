import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Basic from './stories/basic';
import FixedSize from './stories/fixed-size';
import notes from './README.md';
import './styles.scss';

const stories = storiesOf('Table', module);

stories.addDecorator(withKnobs).addDecorator(withInfo);

stories.add('Basic usage', Basic, { notes });
stories.add('Fixed size', FixedSize, { notes });
