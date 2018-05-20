<template>
    <div class="col-full">
        <h1>Not Found</h1>
        <p>Go 
            <router-link :to="{name: 'Home'}">
                Home
            </router-link>
        </p>
    </div>
</template>

<style scoped>
h1 {
  font-size: 100px;
}

p {
  font-size: 50px;
  font-weight: 100;
}

div {
  text-align: center;
}
</style>
