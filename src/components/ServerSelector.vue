<template>
    <div class="form-group">
      <label for="server">Server</label>
      <select v-model="this.$parent.server" class="form-control" name="server" id="server">
        <option value="eu" selected>EU</option>
        <option value="ru">RU</option>
        <option value="com">NA</option>
        <option value="asia">ASIA</option>
      </select>
    </div>
</template>
<script>
export default {
    props: {
    }
}
</script>