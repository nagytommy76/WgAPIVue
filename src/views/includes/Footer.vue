<template>
    <footer>
        <p>Copyright &copy; Nagy Tamás, Budapest {{ dateTime }} </p>
    </footer>
</template>
<script>
export default {
   computed: {
       dateTime(){
           let date = new Date();
           return date.getFullYear()
       }
   }
}
</script>