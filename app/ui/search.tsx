'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); 
  /*******************************************
    nextのクライアントコンポーネントhooksで
    URLのクエリ文字列を取得することができる。
    const searchParams = useSearchParams()
 
    const search = searchParams.get('search')
    const test = searchParams.get('page')
 
    URL -> `/dashboard?search=my-project?page=1`
    `search` -> 'my-project'
    `page`   -> 1
  ********************************************/

  const pathname = usePathname();
  /*******************************************
    nextのクライアントコンポーネントhooksで
    現在のURLのパス名を取得することができる。

    URL	                  Returned value
    /	                =>  '/'
    /dashboard	      =>  '/dashboard'
    /dashboard?v=2	  =>  '/dashboard'
    /blog/hello-world	=>  '/blog/hello-world'
  ********************************************/

  const { replace } = useRouter();
  /*******************************************
    クライアントコンポーネント内のルートを変更できる
    以下の例はクリック時に /dashboard に遷移する

   'use client'
 
    import { useRouter } from 'next/navigation'
    
    export default function Page() {
      const router = useRouter()
    
      return (
        <button type="button" onClick={() => router.push('/dashboard')}>
          Dashboard
        </button>
      )
    }
  ********************************************/

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

  /*******************************************************************************
    new URLSearchParams(paramString)
    ↑ はWebAPIでURL のクエリー文字列の操作に役立つメソッドを定義します

    set(name, value) -> 設定するパラメータの名前（name）に対して値（value）を設定

    let url = new URL("https://example.com?foo=1&bar=2");
    let params = new URLSearchParams(url.search);

    // 3 つ目のパラメーターを追加
    params.set("baz", 3);
    params.toString(); // "foo=1&bar=2&baz=3"

    delete(name)
    delete(name, value) -> 指定されたパラメーターとそれに関連するすべての値を削除する

  *******************************************************************************/
   
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
