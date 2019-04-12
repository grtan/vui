<template>
  <i class="vui-icon" :vui-type="value" :vui-disabled="disabled" @click="!disabled&&$emit('click')"></i>
</template>

<script>
  function unicodes2string () {
    var codeUnits = [], codeLen = 0, result = "";

    for (var index = 0, len = arguments.length; index !== len; ++index) {
      var codePoint = +arguments[index];
      // correctly handles all cases including `NaN`, `-Infinity`, `+Infinity`
      // The surrounding `!(...)` is required to correctly handle `NaN` cases
      // The (codePoint>>>0) === codePoint clause handles decimals and negatives
      if (!(codePoint < 0x10FFFF && (codePoint >>> 0) === codePoint))
        throw RangeError("Invalid code point: " + codePoint);
      if (codePoint <= 0xFFFF) { // BMP code point
        codeLen = codeUnits.push(codePoint);
      } else { // Astral code point; split in surrogate halves
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        codePoint -= 0x10000;
        codeLen = codeUnits.push(
          (codePoint >> 10) + 0xD800,  // highSurrogate
          (codePoint % 0x400) + 0xDC00 // lowSurrogate
        );
      }
      if (codeLen >= 0x3fff) {
        result += String.fromCharCode.apply(null, codeUnits);
        codeUnits.length = 0;
      }
    }

    return result + String.fromCharCode.apply(null, codeUnits);
  }

  export default {
    name: 'vui-icon',
    props: {
      type: { // 类型
        type: String, // 16进制的unicode编码字符串
        required: true
      },
      disabled: { // 禁用
        type: Boolean,
        default: false
      }
    },
    computed: {
      value() {
        return unicodes2string(parseInt(this.type, 16))
      }
    }
  }
</script>