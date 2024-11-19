const modules = import.meta.glob('@/assets/logo/**', {
    query: '?url',
    import: 'default',
});
export const getTenantInfo = async () => {
    const tenant = import.meta.env.VITE_TENANT;

    const res: any = await Promise.all([
        modules[`/src/assets/logo/${tenant}/logo.png`](),
        modules[`/src/assets/logo/${tenant}/logo-ico.png`](),
        modules[`/src/assets/logo/${tenant}/w-logo.png`](),
    ]);
    return {
        name: tenant,
        logo: res[0],
        ico: res[1],
        wLogo: res[2],
    };
};

export const changeFavicon = (link) => {
    let $favicon: any = document.querySelector('link[rel="icon"]');
    if ($favicon !== null) {
        $favicon.href = link;
    } else {
        $favicon = document.createElement('link');
        $favicon.rel = 'icon';
        $favicon.href = link;
        document.head.appendChild($favicon);
    }
};
