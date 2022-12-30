<template>
    <div class="footer">
        <div class="col-one">
            <div class="nav-logo-white"/>
            <h3>Currynomics Labs OÜ</h3>
            <p>Redcurry is a liquid store of wealth - a real estate-backed digital currency to enable the world's access to a store of value and liquidity–for banked and unbanked alike.</p>
            <h2>JOIN THE COMMUNITY</h2>
            <div id="discord-icon">Discord</div>
            <div id="telegram-icon">Telegram</div>
        </div>
        <div class="col-two">
            <div class="row-one">
                JOIN
            </div>
            <div class="row-two">
                <div class="col-m-one">
                    MENU
                </div>
                <div class="col-m-two">
                    RESOURCES
                </div>
                <div class="col-m-three">
                    COMPANY
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/styles/index.css';

.footer {
    height: 484px;
    text-align: left;
    width: 100%;
    color: #ffffff;
    background-color: #444343;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.col-one{
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-right: 5em;
    padding: 2em;
}

.col-two{
    display: flex;
    flex-direction: column;
    padding: 2em;

}

.row-two{
    display: flex;
    flex-direction: row;
}
</style>
