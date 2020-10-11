<template>
  <div>
    <label v-if="label" class="form-label" :for="id">{{ label }}:</label>
    <input
      :id="id"
      ref="input"
      v-bind="$attrs"
      class="form-input"
      :class="{ error: error }"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const textInput = {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default() {
        return `text-input-00`
      }
    },
    type: {
      type: String,
      default: "text"
    },
    value: String,
    label: String,
    error: String
  },
  methods: {
    focus() {
      //   this.$refs.input.focus()
    },
    select() {
      //   this.$refs.input.select()
    },
    setSelectionRange(start: any, end: any) {
      //   this.$refs.input.setSelectionRange(start, end)
    }
  }
}

export default defineComponent(textInput)
</script>
