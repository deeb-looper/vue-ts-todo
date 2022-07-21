import ButtonVue, { Props } from "./Button.vue";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/vue3";

export default {
  title: "atom/Button",
  component: ButtonVue,
  args: {
    onClick: () => alert("button clicked!"),
    label: {
      control: { type: "text" },
    },
  },
};

const Template: Story<Props> = (args: Props) => ({
  components: { ButtonVue },
  setup() {
    return { args };
  },
  template: '<ButtonVue v-bind="args" />',
});

export const Button = Template.bind({});
Button.args = {
  label: "Test button",
  onClick: action("Presses"),
};
