import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * FUNCTIONS Supabase
 */

async function fetchUUIDSupabase(uuid: string) {
    const { data, error } = await supabase
        .from('shortUrl')
        .select('*')
        .eq('uuid', uuid)

    if (error) {
        console.error(error)
        return null
    }
    return data[0]
}



export async function extractDataLocalStorage() {
    const data = localStorage.getItem("localDataZyrl");
    if (!data) return [];

    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) {
        console.error("Invalid data format in local storage");
        return [];
    }

    const fetchedData: any[] = [];

    for (const item of parsedData) {
        const dataSupabase = await fetchUUIDSupabase(item);
        if (dataSupabase) {
            fetchedData.push(dataSupabase);
        }
    }

    return fetchedData;
}

/**
 * Save data to local storage
 * [ 
 *      uuid: <string>,
        }
    }
}



/**
 * Function isValidURL
 */

export async function isValidURL(url: string) {
    const urlPattern = /^(https?:\/\/)?((?!localhost)[\w.-]+)\.([a-z]{2,})(:\d{1,5})?(\/.*)?$/i;
    let urlRegex = new RegExp(urlPattern);

    return urlRegex.test(url);
}

/**
 * Function addLinkToLocalStorage
 */
export function addLinkToLocalStorage(link: any) {
    const data = localStorage.getItem("localDataZyrl");
    const parsedData = data ? JSON.parse(data) : [];
    parsedData.push(link);
    localStorage.setItem("localDataZyrl", JSON.stringify(parsedData));
}

/**
 * Function findExistAliasName
 */
export async function findExistAliasName(alias: string) {
    const { data, error } = await supabase
        .from('shortUrl')
        .select('*')
        .eq('alias', alias);

    if (error) {
        console.error(error);
        return null;
    }
    return data.length > 0;
}

/**
 * Function addLinkToSupabase
 */
export async function addLinkToSupabase(url: string, alias: string) {
    const short_url = Math.random().toString(36).substring(2, 7);

    const { data, error } = await supabase
        .from('shortUrl')
        .insert({
            url: url,
            alias: alias,
            short_url: alias || short_url,
        })
        .select();

    if (error) {
        console.error(error)
        return null;
    }
    return data[0];
}


/**
 * Function findLinkByShortURL
 */
export async function findLinkByShortURL(short_url: any) {
    const { data, error } = await supabase
        .from('shortUrl')
        .select('*')
        .eq('short_url', short_url);

    if (error) {
        console.error(error);
        return null;
    }
    return data[0];
}


/**
 * Function updateClickCount
 */
export async function updateClickCount(uuid: string) {
    const { data: current, error: selectError } = await supabase
        .from('shortUrl')
        .select('clicks')
        .eq('uuid', uuid)
        .single();

    if (selectError) {
        console.error('Select error:', selectError);
        return null;
    }

    const newClicks = (current?.clicks ?? 0) + 1;

    const { data, error: updateError } = await supabase
        .from('shortUrl')
        .update({ clicks: newClicks })
        .eq('uuid', uuid)
        .select();

    if (updateError) {
        console.error('Update error:', updateError);
        return null;
    }

    return data[0];
}


/**
 * Function deleteLinkSupabase
 */
export async function deleteLinkSupabase(uuid: string) {
    const { data, error } = await supabase
        .from('shortUrl')
        .delete()
        .eq('uuid', uuid)
        .select();

    if (error) {
        console.error('Delete error:', error);
        return null;
    }

    return data[0];
}

/**
 * Function deleteLinkLocalStorage
 */
export function deleteLinkLocalStorage(uuid: string) {
    const data = localStorage.getItem("localDataZyrl");
    if (!data) return;

    const parsedData = JSON.parse(data);
    const newData = parsedData.filter((item: any) => item.uuid !== uuid);
    localStorage.setItem("localDataZyrl", JSON.stringify(newData));
}