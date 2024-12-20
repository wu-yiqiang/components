<template>
    <section class="ElevatorNavigation" style="timeline-scope: --t1, --t2, --t3, --t4, --t5, --t6">
        <div class="contents">
            <div class="scrolls">
                <div class="content" style="--s: --t1" id="t1">
                    <h2>一、Safety</h2>
                    <section class="content-item">
                        <div class="contents-box" style="height: 900px;"></div>
                    </section>
                </div>
                <div class="content" style="--s: --t2" id="t2">
                    <h2>二、Hease</h2>
                    <section>
                        <div class="contents-box" style="height: 600px;"></div>
                    </section>
                </div>
                <div class="content" style="--s: --t3" id="t3">
                    <h2>三、BBS</h2>
                    <section>
                        <div class="contents-box" style="height: 500px;"></div>
                    </section>
                </div>
                <div id="t4" class="content" style="--s: --t4">
                    <h2>四、Setting</h2>
                    <section>
                        <div class="contents-box" style="height: 600px;"></div>
                    </section>
                </div>
                <div id="t5" class="content" style="--s: --t5">
                    <h2>五、Passport</h2>
                    <section>
                        <div class="contents-box" style="height: 400px;"></div>
                    </section>
                </div>
                <div id="t6" class="content" style="--s: --t6">
                    <h2>六、Case</h2>
                    <section>
                        <div class="contents-box" style="height: 800px;"></div>
                    </section>
                </div>
            </div>
        </div>
        <nav>
            <a href="#t1" style="--s: --t1">一、Safety</a>
            <a href="#t2" style="--s: --t2">二、Hease</a>
            <a href="#t3" style="--s: --t3">三、BBS</a>
            <a href="#t4" style="--s: --t4">四、Setting</a>
            <a href="#t5" style="--s: --t5">五、Passport</a>
            <a href="#t6" style="--s: --t6">六、Case</a>
        </nav>
    </section>
</template>

<script setup lang="ts">
let formState = ref({
    note: '',
});
</script>
<style scoped lang="scss">
.ElevatorNavigation {
    scroll-behavior: smooth;
    padding: 14px;
    display: flex;
    justify-content: space-between;
    .contents {
        flex: 1;
        width: 100%;
        padding: 14px;
        overflow: scroll;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        .scrolls {
            height: 3100px;
            .content {
                display: flex;
                flex-direction: column;
                view-timeline-name: var(--s);
                view-timeline-inset: auto;
                h2 {
                    margin: 0;
                    padding: 0.8em 0;
                    scroll-margin: 20px;
                }

                .content-item {
                    padding: 14px;

                    .ItforceCard {
                        flex: 1;
                    }
                }
            }

        }
    }

    nav {
        background: #fff;
        padding: 10px 0;
        border-radius: 4px;
        height: fit-content;
        display: grid;

        a {
            display: block;
            line-height: 2;
            padding: 0 15px;
            font-size: 14px;
            color: #191919;
            text-decoration: none;
            animation: active;
            animation-timeline: var(--s);
            border-left: 4px solid transparent;

            &:hover {
                background-color: #d5d5d54a;
            }
        }

        @keyframes active {

            0%,
            100% {
                color: #6f00ff;
                border-color: #6f00ff;
            }
        }
    }
}
</style>
