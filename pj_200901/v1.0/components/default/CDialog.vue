<template>
<div>
    <c-error-msg />
    
    <c-delete />
    
    <!-- 우편번호 (절대 수정하지 말것, 개고생...) -->
    <v-dialog 
        v-model="$store.state.c_daum_post.dialog"
        persistent
        max-width="305"
        >
        <c-daum-post />
    </v-dialog>

    <!-- 그룹선택 -->
    <c-select />

    <!-- 입력폼 -->
    <c-form />

    <c-date-view />

</div>    
</template>
