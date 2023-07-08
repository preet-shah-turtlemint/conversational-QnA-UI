function hasPermission(permission: string, key: string): boolean {
	const encodedData = localStorage.getItem(key);
	if (process.env.REACT_APP_LOCAL_ALL_PERMISSIONS) return true;
	if (encodedData && permission) {
		try {
			const permissions: any = JSON.parse(atob(encodedData));
			return permissions[permission] === permission;
		} catch (e) {
			console.error(e);
		}
	}
	return false;
}

export function hasViewPermission(permission: string): boolean {
	return hasPermission(permission, "viewPermissions");
}

export function hasActionPermission(permission: string): boolean {
	return hasPermission(permission, "actionPermissions");
}
