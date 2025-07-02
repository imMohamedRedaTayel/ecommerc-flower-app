export function normalizeSearchParams(
    searchParams: { [key: string]: string | string[] | undefined }
  ) {
    const params: Record<string, string> = {}
  
    for (const [key, value] of Object.entries(searchParams)) {
      params[key] = Array.isArray(value) ? value[0] : value ?? ""
    }
  
    // إذا لم يكن موجود بالفعل، أضف limit = 6
    if (!params.limit) {
      params.limit = "6"
    }
  
    return new URLSearchParams(params)
  }
  