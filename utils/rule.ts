import { RuleObject } from 'ant-design-vue/es/form';

export const required = ($t: any): RuleObject => {
    return {
        required: true,
        message: $t('thisItemCannotBeEmpty'),
        trigger: ['blur', 'change'],
    };
};
