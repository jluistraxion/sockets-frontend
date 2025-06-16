import { defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'

// Object.keys(AllRules).forEach((rule) => defineRule(rule, AllRules[rule]))
export default function registerValidationRules() {
  Object.entries(AllRules).forEach(([name, ruleFn]) => {
    if (typeof ruleFn === 'function') {
      defineRule(name, ruleFn)
    }
  })
}
