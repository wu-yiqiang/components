<template>
    <section class='ElevatorNavigation'>
        <div class="contents">
            <div class="content">
                <div class="title">Safety</div>
                <div class="item">
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                </div>
            </div>
            <div class="content">
                <div class="title">Hease</div>
                <div class="item">
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                </div>
            </div>
            <div class="content">
                <div class="title">BBS</div>
                <div class="item">
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                </div>
            </div>
            <div class="content">
                <div class="title">Setting</div>
                <div class="item">
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                </div>
            </div>
            <div class="content">
                <div class="title">Passport</div>
                <div class="item">
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                </div>
            </div>
            <div class="content">
                <div class="title">Case</div>
                <div class="item">
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                </div>
            </div>
        </div>
        <nav>
            <a>一、Safety</a>
            <a>二、Hease</a>
            <a>三、BBS</a>
            <a>四、Setting</a>
            <a>五、Passport</a>
            <a>六、Case</a>
        </nav>
    </section>
</template>

<script setup lang='ts'>
</script>
<style scoped lang='scss'>
.ElevatorNavigation {
    padding: 14px;
    display: flex;
    justify-content: space-between;
    background-color: aliceblue;
    overflow: auto;

    .contents {
        display: grid;
        row-gap: 10px;
        width: 700px;

        .content {
            word-wrap: break-word;

            .title {
                font-size: 20px;
                font-weight: 700;
                color: #333;
            }

            .item {
                padding: 20px;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;

                .content-item {
                    width: 80px;
                    aspect-ratio: 1 / 1;
                    background-color: purple;
                    border-radius: 4px;
                }
            }
        }
    }

    nav {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        font-size: 14px;
        height: fit-content;
        background-color: #fff;
        padding: 14px;
        border-radius: 4px;
    }
}
</style>